import { animate, style, transition, trigger } from '@angular/animations';

export const DropdownAnimation = trigger('dropdown', [
  transition(':enter', [
    style({ height: 0, overflow: 'hidden', opacity: 0 }),
    animate('200ms', style({ height: '*', opacity: 1, transform: 'none' })),
  ]),

  transition(':leave', [
    style({ height: '*', overflow: 'hidden', opacity: 1, transform: 'none' }),
    animate('200ms', style({ height: 0, opacity: 0 })),
  ]),
]);
