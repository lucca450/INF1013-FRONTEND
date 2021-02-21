import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  // Fonction pour gèrer l'affichage des numéro de téléphones.
  transform(phone: number): string {

    let pipedPhone = '';
    const str = phone.toString();

    pipedPhone += str.substr(0, 3) + '-';
    pipedPhone += str.substr(3, 3) + '-';
    pipedPhone += str.substr(6, 4);
    return pipedPhone;
  }

}

