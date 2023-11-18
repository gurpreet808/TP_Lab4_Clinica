import { Pipe, PipeTransform } from '@angular/core';
import { ObraSocialService } from '../servicios/obra-social.service';
import { ObraSocial } from '../clases/obra-social';

@Pipe({
  name: 'obraSocial',
  pure: false
})
export class ObraSocialPipe implements PipeTransform {

  constructor(private servObraSocial: ObraSocialService) {

  }

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value != undefined) {
      let obra_social = this.servObraSocial.obras_sociales.value.find((os: ObraSocial) => os.id === value);

      if (obra_social) {
        return obra_social.nombre;
      }
    }
    //return "Obra Social no encontrada";
    return value;
  }

}