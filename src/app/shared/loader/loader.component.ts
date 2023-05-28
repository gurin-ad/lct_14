import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { ILoader, LoaderCtor, mixinLoader } from './loader.helper';

const LoaderBase: LoaderCtor = mixinLoader(
  class {
    constructor(public _elementRef: ElementRef) {
    }
  },
);

@Component({
  selector: 'app-loader',
  template: `
    <div class='wrap' [class.absolute]='absolute'>
      <div class='loader'></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
  inputs: ['absolute'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent extends LoaderBase implements ILoader {
}
