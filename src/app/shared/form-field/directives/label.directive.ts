import { Directive, InjectionToken } from '@angular/core';

export const APP_LABEL = new InjectionToken<LabelDirective>('AppLabel');

@Directive({
  selector: 'app-label',
  providers: [{ provide: APP_LABEL, useExisting: LabelDirective }],
})
export class LabelDirective {
}
