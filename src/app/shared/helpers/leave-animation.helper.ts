import { animate, sequence, style, transition, trigger } from '@angular/animations';

export const leaveAnimation = trigger('leaveAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    sequence([
      animate('100ms', style({ opacity: 1 })),
      animate('400ms', style({ opacity: 0 })),
    ]),
  ]),
]);
