import { Pipe, PipeTransform } from '@angular/core';
import { ObraSocialService } from '../servicios/obra-social.service';
import { ObraSocial } from '../clases/obra-social';

@Pipe({
  name: 'obraSocial'
})
export class ObraSocialPipe implements PipeTransform {

  constructor(private servObraSocial: ObraSocialService) {
    
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value != undefined) {
      let ya_existe = this.servObraSocial.obras_sociales.value.find((os: ObraSocial) => os.id === value);

      if (ya_existe) {
        return ya_existe.nombre;
      }
    }

    return value;
  }

}