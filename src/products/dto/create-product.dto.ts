import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class CreateProductDto {

    @IsString()
    @IsNotEmpty({ message: "El nombre es requerido" })
    name: string

    @IsString()
    @IsOptional()
    image?: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsNotEmpty({ message: "El precio es requerido" })
    price: number

    @IsInt()
    @Min(0, { message: "El inventario debe ser mayor o igual a 0" })
    @IsNotEmpty({ message: "El inventario es requerido" })
    inventory: number

    @IsInt({ message: "La categoría debe ser un número entero" })
    @IsNotEmpty({ message: "La categoría es requerida" })
    categoryId: number
}
