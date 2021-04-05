import {FormGroup, ValidatorFn} from '@angular/forms';

// Fonction pour comparer deux dates
export function dateLessThan(firstDateField: string, secondDateField: string): ValidatorFn {
  return (form: FormGroup): { [key: string]: boolean } | null => {


    const firstDateValue = form.get(firstDateField).value;
    const secondDateValue = form.get(secondDateField).value;
    if (firstDateValue != null && secondDateValue != null && firstDateValue !== '' && secondDateValue !== '')
    {
      const firstDate = new Date(firstDateValue);
      const secondDate = new Date(secondDateValue);
      if (firstDate.getTime() >= secondDate.getTime()) {
        const err = { dateLessThan: true };
        form.get(firstDateField).setErrors(err);
        return err;
      }
      else{
        form.get(firstDateField).setErrors(null);
      }
    }
  };
}
