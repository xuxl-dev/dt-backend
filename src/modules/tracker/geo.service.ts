import { Injectable, Logger } from '@nestjs/common'
import { Subject } from 'rxjs'
import {
  auditTime,
  groupBy,
  mergeMap,
  combineLatest,
  timer,
  map,
  bufferTime,
  filter,
} from 'rxjs'
import { DeviceID } from './decl'
import { RedisService } from '../db/redis/redis.service'
import { Tracker } from './entities/tracker.entity'
import { getTrackerRedisName } from './tracker.service'
import { PushDataDto } from './dto/push-data.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GeoData, GeoDataScheme } from './entities/push-geo.dto'
import { SioService } from '../sio/sio.service'
import { ROOM_GEO } from '../sio/decl'
import { createPoint2D } from './GeoUtils'

export const GeoUpdateObject: Subject<PushDataDto<GeoData>> = new Subject<
  PushDataDto<GeoData>
>()

const logger = new Logger('GeoService')

@Injectable()
export class GeoService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Tracker)
    private readonly trackerRepository: Repository<Tracker>, // private readonly sioService: SioService
    private readonly sioService: SioService
  ) {
    const timerObservable = timer(1000)

    GeoUpdateObject.pipe(
      groupBy((auditData) => auditData.device),
      mergeMap((grouped) => grouped.pipe(auditTime(5000)))
    ).subscribe((auditData) => {
      this.redisService.set(
        getTrackerRedisName(auditData.device),
        JSON.stringify(auditData)
      )
    })

    // audit the location update
    // only pick last request in 5000ms from every sender accordingly
    GeoUpdateObject.pipe(
      groupBy((auditData) => auditData.device),
      mergeMap((grouped) => grouped.pipe(auditTime(5000)))
    ).subscribe((auditData) => {
      console.log('Audit Data flushed')
      this.flushCacheToDb(auditData.device)
    })

    combineLatest([GeoUpdateObject, timerObservable])
      .pipe(
        map(([data, _]) => data),
        bufferTime(5000),
        filter((bufferedData) => bufferedData.length > 0)
      )
      .subscribe((compressedData) => {
        console.log('#Compressed Data:', compressedData.length)
        this.sioService.broadcastToGroup(ROOM_GEO, 'geo-update', compressedData)
      })
  }

  async flushCacheToDb(deviceId: DeviceID) {
    try {
      // Retrieve geo data from Redis
      const geoDataFromRedis = await this.redisService.get(
        getTrackerRedisName(deviceId)
      )
      if (!geoDataFromRedis) {
        logger.warn(
          `No geo data found in Redis for device ${deviceId}. Skipping flush to DB.`
        )
        return
      }

      // Parse geo data and handle null case
      const geoData = JSON.parse(geoDataFromRedis)?.content as GeoData
      const deviceGeo = GeoDataScheme.safeParse(geoData)
      if (deviceGeo.success === false) {
        logger.warn(
          `Error while parsing geo data from Redis for device ${deviceId}:`,
          deviceGeo.error
        )
        return
      }

      // Upsert the location to the tracker repository
      this.trackerRepository.upsert(
        {
          id: deviceId,
          location: createPoint2D(deviceGeo.data),
        },
        {
          conflictPaths: ['id'],
        }
      )
    } catch (error) {
      logger.warn(
        `Error while flushing cache to DB for device ${deviceId}:`,
        error
      )
    }
  }
}
