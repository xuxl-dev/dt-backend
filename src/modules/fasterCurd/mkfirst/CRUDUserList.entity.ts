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

@Entity()
@Read({
    sort: { id: 'ASC' },
})
@Create({
    require: /.*/,
    deny: ['id'],
    expect: [(x) => x.name.length >= 3, (x) => x.name.length <= 10],
})
@IgnoreField(['id'])
@CRUD({ name: 'userlist' })
export class CRUDUserList {
    @PrimaryGeneratedColumn()
    @$.Number('ID', { column: { width: 50 }, form: { show: false } })
    id: number

    @Column()
    @$.Text('Name', {
        search: { show: true },
        column: { resizable: true, width: 100 },
    })
    name: string

    @Column()
    @$.NumberDictSelect('role', ['User', 'Admin'])
    role: number

    @Column()
    @$.Text('StartDate', {
        search: { show: true },
        column: { resizable: true, width: 200 },
    })
    StartDate: string
}