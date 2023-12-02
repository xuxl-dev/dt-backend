import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import {
  Action,
  Create,
  Create2,
  CRUD,
  IgnoreField,
  Read,
} from '../fc.decorators'
import { $ } from '../crud-gen/fast-crud.decorator'

@Entity()
@Create({
  requires: /.*/,
  expect: [(x) => x.name.length >= 3, (x) => x.name.length <= 10],
})
@Read({
  sort: { id: 'ASC' },
  TransformRecordsInplace: (u) => (u.name = u.name.toUpperCase()),
})
@Action({
  method: 'read',
  action: 'abaaba',
  expect: (x) => x.name.length > 3,
  transformQueryRet: () => 666,
  rawInput: true, // this prevents the form from being wrapped, ignores pagination & sort
})
@Create2({
  transformQueryRet: () => {
    return {
      'name': 'hello',
      'id': 114514
    }
  },
  transformAfter: (form, queryRet) => {queryRet.id},
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
