import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../categories/entities/category.entity";

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

    //*eager: sirve para que las relaciones se carguen automaticamente { eager: true }
    @ManyToOne(() => Category)
    //*esto es para que en en el prodcuto salga { category:{id, name}}
    //todo: esto hace la relacion con la entity category 
    category: Category
}


