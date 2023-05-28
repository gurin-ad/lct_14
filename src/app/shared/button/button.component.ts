import { Component, ChangeDetectionStrategy, ElementRef, ViewEncapsulation } from '@angular/core';
import { ButtonCtor, IButton, mixinButton } from './button.helper';
import { CanDisableCtor, CanFullCtor, IDisable, IFull, mixinDisabled, mixinFull } from '../helpers';

const buttonAttributes: string[] = [
  'app-basic-button',
  'app-fill-button',
  'app-fill-green-button',
  'app-stroked-button',
  'app-control-button',
  'app-icon-button',
  'app-red-button',
  'app-icon-inherit-button'
];

const ButtonBase: ButtonCtor & CanDisableCtor & CanFullCtor = mixinButton(
  mixinFull(
    mixinDisabled(
      class {
        constructor(public _elementRef: ElementRef) {
        }
      },
    ),
  ),
);

@Component({
  selector: `
    button[app-basic-button], button[app-fill-button], button[app-fill-green-button],
    button[app-stroked-button], button[app-icon-button], button[app-control-button],
    p[app-red-button], a[app-basic-button], a[app-fill-button],
    a[app-stroked-button], a[app-icon-button],
    i[app-icon-inherit-button],
  `,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.small]': 'small',
    '[class.full]': 'full',
  },
  inputs: ['small', 'full', 'disabled'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonBase implements IButton, IDisable, IFull {
  constructor(public elementRef: ElementRef) {
    super(elementRef);

    elementRef.nativeElement.classList.add('app-button');

    for (const attr of buttonAttributes) {
      if (this.hasHostAttributes(attr)) {
        (this.getHostElement() as HTMLElement).classList.add(attr);
      }
    }
  }

  private hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some(attribute => this.getHostElement().hasAttribute(attribute));
  }

  private getHostElement(): Element {
    return this.elementRef.nativeElement;
  }
}
