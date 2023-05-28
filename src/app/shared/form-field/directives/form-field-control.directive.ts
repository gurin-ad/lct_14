import { Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Directive()
export abstract class FormFieldControlDirective<T> {
  value!: any | null;
  focused!: boolean;
  stateChanges!: Observable<void>;
  controlType?: string;
  type?: string;
  inputType?: string;
  touched?: boolean;
  disabled?: boolean;

  abstract onContainerClick?(event: MouseEvent): void;
}

