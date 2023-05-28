import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParamComponent {
  @Input() label!: string;
  @Input() value?: string | number;
  @Input() unit?: string;
}
