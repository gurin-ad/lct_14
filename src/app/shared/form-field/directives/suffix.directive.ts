import { Directive, InjectionToken } from '@angular/core';

export const APP_SUFFIX = new InjectionToken<SuffixDirective>('AppSuffix');

@Directive({
  selector: '[appSuffix]',
  providers: [{ provide: APP_SUFFIX, useExisting: SuffixDirective }],
})
export class SuffixDirective {
}
