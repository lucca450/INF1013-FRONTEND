import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertInterfaceName'
})
export class ConvertInterfaceNamePipe implements PipeTransform {
  // Fonction pour transformer le nom des interfaces
  transform(interfaceName: string): string {

    if (interfaceName == 'Intervenant ') {
      return 'Intervenant'
    }
    else if(interfaceName == 'EmergencyContact')
    {
      return 'Contacte d\'urgence'
    }

    else if (interfaceName == 'Doctor') {
      return 'Médecin'
    } else if (interfaceName == 'OtherPerson') {
      return 'Autres'
    }
  }

}
