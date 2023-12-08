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
import { apply, find, findAll, forEach, forallValues, group, groupBy, map, objectify, pick, rename, values } from '../backend/transform/transforms'

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
    forEach((u)=>u.name = u.name.substring(0, 5).toLocaleLowerCase()),
    map((u) => u.split('').filter((c) => c === 'a').length),
    group(),
    forallValues((v) => v.length)
  )
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
