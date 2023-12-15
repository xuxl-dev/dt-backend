import { Module } from '@nestjs/common'
import { FasterCrudService } from './fc.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CRUDUser } from './demo/CRUDUser.entity'
import { CRUDUserService } from './demo/CRUDUser.service'
import { FCrudJwtMiddleware } from './middleware/jwt.middleware'
import { AuthModule } from '../auth/auth.module'
import { CRUDUserList } from './mkfirst/CRUDUserList.entity'
import { CRUDUserListService } from './mkfirst/CRUDUserList.service'

@Module({
  imports: [TypeOrmModule.forFeature([CRUDUser]), AuthModule, TypeOrmModule.forFeature([CRUDUserList])],
  providers: [FasterCrudService, CRUDUserService, FCrudJwtMiddleware, CRUDUserListService],
})
export class FasterCrudModule { }
