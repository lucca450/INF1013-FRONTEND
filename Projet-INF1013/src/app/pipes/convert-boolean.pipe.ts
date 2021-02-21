import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBoolean'
})
export class ConvertBooleanPipe implements PipeTransform {

  transform(booleanValue: boolean): string {

   if(booleanValue)
   {
     return 'Oui'
   }
   else {
     return 'Non'
   }
  }

}
