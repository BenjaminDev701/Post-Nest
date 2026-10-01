import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 60, unique: true })
    name: string

    //*nullable : es para que acepte valores nulos , 
    @Column({ type: "varchar", length: 120, nullable: true, default: "default.svg" })
    image: string

    @Column({ type: "decimal", })
    price: number

    @Column({ type: "int", default: 0 })
    inventory: number
}


