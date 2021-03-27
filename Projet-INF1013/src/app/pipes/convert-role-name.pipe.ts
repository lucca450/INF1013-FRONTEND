import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertRoleName'
})
export class ConvertRoleNamePipe implements PipeTransform {

  // Fonction pour convetir la lettre du rôle en nom
  transform(role: string): string {

    if (role == 'I') {
      return 'Intervenant'
    }
    else if(role == 'A')
    {
      return 'Administrateur'
    }
  }

}
