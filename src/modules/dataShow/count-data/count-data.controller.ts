import { Body, Controller, Post } from '@nestjs/common';
import { CountDataService } from './count-data.service';

@Controller('count-data')
export class CountDataController {
    constructor(private readonly CountDataService: CountDataService) { }

    @Post('addInformation')
    async addInformation(@Body() msg: any) {
        return await this.CountDataService.addInformation(msg);
    }

    @Post('getInformation')
    async getInformation(@Body() msg: any) {
        return await this.CountDataService.getInformation(msg);
    }
}
