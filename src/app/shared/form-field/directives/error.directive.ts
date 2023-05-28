import { Directive, InjectionToken } from '@angular/core';

export const APP_ERROR = new InjectionToken<ErrorDirective>('AppError');

@Directive({
  selector: 'app-error',
  providers: [{ provide: APP_ERROR, useExisting: ErrorDirective }],
})
export class ErrorDirective {
}
