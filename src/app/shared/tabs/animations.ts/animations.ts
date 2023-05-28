import { trigger, transition, style, animate, state } from "@angular/animations";

export let slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100vh)', opacity: 1, }),
    animate('500ms cubic-bezier(.61, .29, .07, 1.02)')
  ])
])

export let fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate(2000)
  ])
]);

export let content = trigger('content', [
  transition(':enter', [
    style({
      transform: 'translateX(-30px)', opacity: 0,
    }),
    animate('220ms ease-out', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)',
      opacity: .8,
      position: 'fixed',
      right: '30px',
      left: '30px',
    }),
    animate('180ms ease-in', style({ transform: 'translateX(150px)', opacity: 0, })),
  ]),
]);
