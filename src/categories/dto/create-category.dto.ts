import { IsNotEmpty, IsString } from "class-validator"


export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty({ message: "No puede ir vacio!" })
    name: string
}
