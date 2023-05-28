import { Directive, InjectionToken } from '@angular/core';

export const APP_PREFIX = new InjectionToken<PrefixDirective>('AppPrefix');

@Directive({
  selector: '[appPrefix]',
  providers: [{ provide: APP_PREFIX, useExisting: PrefixDirective }],
})
export class PrefixDirective {
}
