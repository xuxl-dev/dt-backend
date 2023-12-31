import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';
import { PushDataDto } from './dto/push-data.dto';
import { PushDataService } from '../sio/handlers/push-data.service';
import { QueryTrackerPeriodDto } from './dto/range-query.dto';
import { QuerySpotPeriodDto } from './dto/spot-query.dto';

@Controller('tracker')
export class TrackerController {
  constructor(
    private readonly trackerService: TrackerService,
    private readonly pushHandler: PushDataService
  ) { }

  @Post()
  create(@Body() createTrackerDto: CreateTrackerDto) {
    return this.trackerService.create(createTrackerDto);
  }

  @Get()
  findAll() {
    return this.trackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackerDto: UpdateTrackerDto) {
    return this.trackerService.update(+id, updateTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackerService.remove(+id);
  }

  @Post("push")
  push(@Body() pushDataDto: PushDataDto) {
    this.pushHandler.push(pushDataDto)
  }

  /**
   * query geo data for single tracker for 
   * @param queryTrackerPeriodDto 
   */
  @Post("query/range")
  queryRange(queryTrackerPeriodDto: QueryTrackerPeriodDto) {
    throw "Not implemented"
  }

  /**
   * query geo data around a spot
   * @param queryTrackerPeriodDto 
   */
  @Post("query/spot")
  queryPosition(querySpotPeriodDto: QuerySpotPeriodDto) {
    throw "Not implemented"
  }
}
