import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBoolean'
})
export class ConvertBooleanPipe implements PipeTransform {
  // Fonction pour traduire les boolean en mot français
  transform(booleanValue: boolean): string {
   if (booleanValue === true)
   {
     return 'Oui';
   }
   else {
     return 'Non';
   }
  }

}
