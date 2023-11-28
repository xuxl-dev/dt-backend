import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Action, Create, CRUD, IgnoreField, Read } from '../fc.decorators'
import { $ } from '../crud-gen/fast-crud.decorator'
import { PageRes } from '../crud-gen/fast-crud.decl'

@Entity()
@Create({
  requires: /.*/,
  expect: [(x) => x.name.length >= 3, (x) => x.name.length <= 10],
})
@Read({
  sort: { id: 'ASC' },
  // transformQueryRet: (pageRes: PageRes<CRUDUser>) =>{pageRes.records.map((u: CRUDUser) => (u.name = u.name.toUpperCase())); return pageRes}
  // TransformQueryRetInplace: (pageRes: PageRes<CRUDUser>) =>
  //   pageRes.records.map((u: CRUDUser) => (u.name = u.name.toUpperCase())),
  TransformRecordsInplace: (u) => (u.name = u.name.toUpperCase()),
})
@Action({
  method: 'read',
  action: 'abaaba',
  transformQueryRet: () => 666,
  rawInput: true, // this prevents the form from being wrapped, ignores pagination & sort
})
@CRUD({ name: 'crud-user' })
@IgnoreField(['id'])
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
  @$.NumberDictSelect(['User', 'Admin'], 'Type')
  type: number
}
