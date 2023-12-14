import { Module } from '@nestjs/common';
import { CountDataController } from './count-data.controller';
import { CountDataService } from './count-data.service';
import { personnelCount } from '../entities/countData.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([personnelCount])],
  controllers: [CountDataController],
  providers: [CountDataService]
})
export class CountDataModule { }
