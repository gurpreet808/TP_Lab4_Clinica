import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialidad'
})
export class EspecialidadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
