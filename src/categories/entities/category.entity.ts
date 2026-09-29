import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 60, unique: true })
    name: string



}
