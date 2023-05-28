import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function validatorDates(start: string, end: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate: moment.Moment | any = control.get(start)?.value;
    const endDate: moment.Moment | any = control.get(end)?.value;
    return moment(startDate).isAfter(moment(endDate), 'day') ? { isAfterEnd: true } : null;
  };
}

export function validatorMonths(start: string, end: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate: moment.Moment | any = control.get(start)?.value;
    const endDate: moment.Moment | any = control.get(end)?.value;
    return moment(endDate).format('DD.MM'), moment(endDate).isBetween(moment(startDate), moment(startDate).add(1, 'M')) ? { isDateInMonth: true } : null;
  };
}
