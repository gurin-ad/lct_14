import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-metadoor-label',
  template: `
    <p>
      © ООО «Метадор Дев»
    </p>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 120%;
        color: #4C4C4C;
        padding: 10px 25px;
        text-align: end;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadoorLabelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
