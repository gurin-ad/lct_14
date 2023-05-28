import { animate, sequence, style, transition, trigger } from '@angular/animations';

export const enterAnimation = trigger('enterAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    sequence([
      animate('100ms', style({ opacity: 0 })),
      animate('400ms', style({ opacity: 1 })),
    ]),
  ]),
]);
