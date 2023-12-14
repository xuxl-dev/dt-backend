import { InjectRepository } from '@nestjs/typeorm'
import { CRUDUserList } from './CRUDUserList.entity'
import { TypeORMRepoAdapter } from '../backend/typeorm/TypeORMRepoAdapter'
import { FasterCrudService } from '../fc.service'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CRUDUserListService {
    constructor(
        fasterCrudService: FasterCrudService,
        @InjectRepository(CRUDUserList)
        userListRepo: Repository<CRUDUserList>
    ) {
        fasterCrudService.generateCRUD(CRUDUserList, new TypeORMRepoAdapter(userListRepo))
    }
}