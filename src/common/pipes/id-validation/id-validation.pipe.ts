import { ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';

//*Generando nuestro propia validacion personalizable de Id
@Injectable()
export class IdValidationPipe extends ParseIntPipe {

  constructor() {
    //*Se usa super para reescribir el constructor
    super({
      //*creamos una instancia de parseIntPipe
      exceptionFactory: () => new BadRequestException("El id no valido")
    })
  }
}
