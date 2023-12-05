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
import { $ } from '../crud-gen/fast-crud.decorator'

@Entity()
@Read({
  sort: { id: 'ASC' },
  TransformRecordInplace: (u) => (u.name = u.name.toUpperCase()),
})
@Action({
  method: 'read',
  action: 'abaaba',
  transformQueryRet: () => 666,
  transformAfter: (data, queryRet) => queryRet,
  rawInput: true, // this prevents the form from being wrapped, ignores pagination & sort
})
@Create({
  requires: /.*/,
  denies: ['id'],
  expect: [(x) => x.name.length >= 3, (x) => x.name.length <= 10],
  transformQueryRet: (result) => {
    return {
      name: 'hello',
      id: 114514,
    }
  },
  transformAfter: (form, queryRet) => {
    // console.log('transformAfter', form, queryRet)
    return queryRet
  },
})
@Delete({
  transform: (data) => {
    // delete data.row.name to eliminate effect of TransformRecordInplace 
    // (if name is uppercased, can't find in db)
    delete data.row.name
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
