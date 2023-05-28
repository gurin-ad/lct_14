import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkedMatchingPasswordsValidator(firstField: string, secondField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstValue: number = control.get(firstField)?.value;
    const secondValue: number = control.get(secondField)?.value;

    if (firstValue === null || secondValue === null) return null;
    return firstValue !== secondValue ? { matchingPasswords: true } : null;
  };
}
