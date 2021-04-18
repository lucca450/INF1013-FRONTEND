import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexe'
})
export class SexePipe implements PipeTransform {

  transform(sexe: string): string {
    if (sexe === '0') {
      return 'Homme';
    }
    else if (sexe === '1') {
      return 'Femme';
    }
    else if (sexe === '2') {
      return 'Autre';
    }
  }
}
