import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";



@Entity('personnelCount')
export class personnelCount {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    date: string;

    @Column({ type: "int" })
    total: number;

    @Column({ type: "int" })
    employees: number;

    @Column({ type: "int" })
    foreignPersonnel: number;
}
