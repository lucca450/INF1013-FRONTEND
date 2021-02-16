import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertInterfaceName'
})
export class ConvertInterfaceName implements PipeTransform {

  transform(interfaceName: string): string {

    if(interfaceName == 'Intervenant ')
    {
      return 'Intervenant'
    }/*
    else if(interfaceName == 'EmergencyContact')
    {
      return 'Contacte d
    }
*/
    else if(interfaceName == 'Doctor')
    {
      return 'Docteur'
    }

    else if(interfaceName == 'OtherPerson')
    {
      return 'Autres'
    }
  }

}
