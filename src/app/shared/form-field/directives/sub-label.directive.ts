import { Directive, InjectionToken } from '@angular/core';

export const APP_SUBLABEL = new InjectionToken<SubLabelDirective>('AppSubLabel');

@Directive({
  selector: 'app-sub-label',
  providers: [{ provide: APP_SUBLABEL, useExisting: SubLabelDirective }],
})
export class SubLabelDirective {

  constructor() { }

}
