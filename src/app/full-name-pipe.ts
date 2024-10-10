import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNamePipe',
  standalone: true
})
export class FullNamePipePipe implements PipeTransform {
  transform(element: { nombre: string, apellido: string }): string {
    return `${element.nombre}, ${element.apellido}`;
  }
}


