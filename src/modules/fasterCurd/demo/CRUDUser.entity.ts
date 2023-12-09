import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import {
  // ActionEx,
  Action,
  // CreateEx,
  Create,
  CRUD,
  Delete,
  IgnoreField,
  Read,
} from '../fc.decorators'
import $ from '../crud-gen/fast-crud.decorator'
import { getBuilder } from '../backend/transform/builder'
import {
  apply,
  find,
  findAll,
  forValues,
  group,
  groupBy,
  map,
  objectify,
  pick,
  rename,
  toArray,
  values,
} from '../backend/transform/transforms'

@Entity()
@Read({
  sort: { id: 'ASC' },
})
@Create({
  require: /.*/,
  deny: ['id'],
  expect: [(x) => x.name.length >= 3, (x) => x.name.length <= 10],
})
@Action({
  action: 'stats',
  method: 'read',
  transformQueryRet: getBuilder<CRUDUser[]>()(
    findAll((u) => u.type === 1),
    map((u) => u.name.substring(0, 5).toLowerCase().split('').length),
    groupBy((n) => n),
    forValues((v) => v.length),
  ),
})
@IgnoreField(['id'])
@CRUD({ name: 'crud-user' })
export class CRUDUser {
  @PrimaryGeneratedColumn()
  @$.Number('ID', { column: { width: 50 }, form: { show: false } })
  id: number

  @Column()
  @$.Text('Name', {
    search: { show: true },
    column: { resizable: true, width: 200 },
  })
  name: string

  @Column()
  @$.NumberDictSelect('Type', ['User', 'Admin'])
  type: number
}
