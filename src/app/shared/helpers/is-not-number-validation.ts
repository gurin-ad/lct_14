import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function inNotNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validate = /^\d+$/.test(control.value);
    return validate ? { isNotNumber: { value: control.value } } : null;
  };
}
