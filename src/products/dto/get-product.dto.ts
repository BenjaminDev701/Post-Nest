import { IsNumberString, IsOptional } from "class-validator";

//*esto sirve para validar los querys en el findall
export class GetProductQueryDto {
    @IsNumberString({}, { message: "El id debe ser un numero" })
    @IsOptional()
    category_id?: number

    @IsOptional()
    @IsNumberString({}, { message: "Debe enviar un numero" })
    take?: number

    @IsOptional()
    @IsNumberString({}, { message: "Debe enviar un numero" })
    skip?: number
}