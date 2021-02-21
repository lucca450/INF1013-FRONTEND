import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertInterfaceName'
})
export class ConvertInterfaceNamePipe implements PipeTransform {

  transform(interfaceName: string): string {

    if (interfaceName == 'Intervenant ') {
      return 'Intervenant'
    }
    else if(interfaceName == 'EmergencyContact')
    {
      return 'ContacteUrgence'
    }

    else if (interfaceName == 'Doctor') {
      return 'Médecin'
    } else if (interfaceName == 'OtherPerson') {
      return 'Autres'
    }
  }

}
