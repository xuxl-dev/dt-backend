import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import {
  Action,
  // CreateEx,
  Create,
  CRUD,
  IgnoreField,
  Read,
} from '../fc.decorators'
import { $ } from '../crud-gen/fast-crud.decorator'

@Entity()
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
@Create({
  requires: /.*/,
  denies: ['id'],
  // exactly: ['name'],
  expect: [(x) => x.name.length >= 3, (x) => x.name.length <= 10],
  transformQueryRet: (result) => {
    return {
      'name': 'hello',
      'id': 114514
    }
  },
  transformAfter: (form, queryRet) => {
    console.log('transformAfter', form, queryRet)
  },
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
