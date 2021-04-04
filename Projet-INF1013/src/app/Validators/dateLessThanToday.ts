import {FormGroup, ValidatorFn, Validators} from '@angular/forms';


export function dateLessThanToday(firstDateField: string): ValidatorFn {
  return (form: FormGroup): { [key: string]: boolean } | null => {
    const firstDateValue = form.get(firstDateField).value;

    const firstDate = new Date(firstDateValue);
    const today =  new Date();
    if (firstDateValue != null) {
      if (firstDate.getTime() >= today.getTime()) {
        const err = {dateLessThanToday: true};
        form.get(firstDateField).setErrors(err);
        return err;
      } else {
       // form.get(firstDateField).setErrors(null);
      }
    }
  };
}
