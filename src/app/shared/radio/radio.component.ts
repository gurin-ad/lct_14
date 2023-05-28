import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
  @Input() name!: string;
  @Input() value!: number;

  @Input()
  get checked(): boolean {
    return this._isChecked;
  };

  set checked(value: boolean) {
    this._isChecked = value;
  }

  private _isChecked: boolean = false;

  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  change() {
    this.onChange.emit(this.value);
  }
}
