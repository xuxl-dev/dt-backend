import { Module } from '@nestjs/common';
import { FcEntityService } from './fc-entity.service';
import { FcEntityResolver } from './fc-entity.resolver';

@Module({
  providers: [FcEntityResolver, FcEntityService]
})
export class FcEntityModule {}
