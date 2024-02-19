import { Injectable } from '@nestjs/common';
import { CreateFcEntityInput } from './dto/create-fc-entity.input';
import { UpdateFcEntityInput } from './dto/update-fc-entity.input';
import { FcEntity } from './entities/fc-entity.entity';

@Injectable()
export class FcEntityService {
  db = [] as FcEntity[]

  constructor() {
    this.db.push({
      id: 1,
      exampleField: 1
    })
    this.db.push({
      id: 2,
      exampleField: 2
    })
  }

  create(createFcEntityInput: CreateFcEntityInput) {
    return {
      id: this.db.length + 1,
      ...createFcEntityInput
    }
  }

  findAll() {
    return this.db
  }

  findOne(id: number) {
    return this.db.find(x => x.id === id)
  }

  update(id: number, updateFcEntityInput: UpdateFcEntityInput) {
    const index = this.db.findIndex(x => x.id === id)
    this.db[index] = {
      ...this.db[index],
      ...updateFcEntityInput
    }
    return this.db[index]
  }

  remove(id: number) {
    const index = this.db.findIndex(x => x.id === id)
    const removed = this.db[index]
    this.db.splice(index, 1)
    return removed
  }
}
