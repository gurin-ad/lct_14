import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ILink, LinkCtor, mixinLink } from './link.helper';

const LinkBase: LinkCtor = mixinLink(
  class {
    constructor(public _elementRef: ElementRef) {
    }
  },
);

@Component({
  selector: 'a[app-link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  host: {
    'class': 'app-link',
    '[class.small]': 'small',
  },
  inputs: ['small'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent extends LinkBase implements ILink {
  @Input() link!: string;
}
