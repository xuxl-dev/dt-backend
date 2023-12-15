import { Injectable } from '@nestjs/common';
import { personnelCount } from '../entities/countData.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountDataService {
    constructor(
        @InjectRepository(personnelCount)
        private readonly personnelCountRepo: Repository<personnelCount>
    ) {
    }
    public async addInformation(param) {
        // console.log('information: ', param._value)
        const information = param._value
        const newDate = this.personnelCountRepo.create(information)
        return await this.personnelCountRepo.save(newDate)

    };

    public async getInformation(msg: any) {
        // console.log(msg)
        const pagesize: number = msg._value.pagesize
        let thelist = []
        let total: number
        let items: any

        items = await this.personnelCountRepo.createQueryBuilder('personnelCount')
            .getMany()

        total = items.length
        let startNumber: number = (total - 1) - pagesize
        let endNumber: number = total

        for (let i = startNumber; i < endNumber; i++) {
            thelist.push(items[i])
        }

        return await thelist

    }
}
