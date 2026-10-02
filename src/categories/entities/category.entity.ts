import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "../../products/entities/product.entity"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 60, unique: true })
    name: string
    //*con que entidad se relaciona, //relacion bidireccional, entra a product y selecciona la propiedad category //cascade es para que cualquier cambio sea de padre a hijos 
    @OneToMany(() => Product, (product) => product.category, { cascade: true })
    //*es de typo array la entidad por que una categoria puede tener muchos productos
    products: Product[]


}
