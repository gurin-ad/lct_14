import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  Input,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormFieldControlDirective } from '../form-field/directives';
import { Subject } from 'rxjs';
import { IInput, InputCtor, mixinInput } from './input.helper';

const InputBase: InputCtor = mixinInput(
  class {
    constructor(
      public _elementRef: ElementRef,
    ) {
    }
  },
);

@Component({
  selector: 'input[app-input]',
  template: '',
  styleUrls: ['./input.component.scss'],
  host: {
    'class': 'app-input',
    '[class.medium]': 'medium',
    '[class.small]': 'small',
    '[attr.type]': 'type',
    '(focus)': 'focusChanged(true)',
    '(blur)': 'focusChanged(false)',
    '[disabled]': 'disabled',
  },
  inputs: ['medium', 'small', 'disabled'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: FormFieldControlDirective, useExisting: InputComponent }],
})
export class InputComponent extends InputBase implements FormFieldControlDirective<string | null>, OnInit, AfterViewInit, OnChanges, OnDestroy, IInput {
  @Input()
  get value(): string {
    return this.inputValueAccessor.value;
  }

  set value(value: any) {
    if (value !== this.value) {
      this.inputValueAccessor.value = value;
      this.stateChanges.next();
    }
  }

  @Input()
  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
    this.stateChanges.next();
  }

  _type: string = 'text';
  inputType: string = this.type;
  focused: boolean = false;
  stateChanges: Subject<void> = new Subject<void>();
  controlType: string = 'input';
  touched: boolean = false;
  private inputValueAccessor: { value: any };

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
    super(elementRef);
    this.inputValueAccessor = elementRef.nativeElement;
  }

  ngOnInit() {
    this.inputType = this.type;
  }

  ngAfterViewInit() {
    this.stateChanges.next();
  }

  ngOnChanges() {
    this.stateChanges.next();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  onContainerClick() {
    if (!this.focused) {
      this.focus();
    }
  }

  focus(options?: FocusOptions) {
    this.elementRef.nativeElement.focus(options);
  }

  focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused) {
      this.focused = isFocused;
      this.touched = true;
      this.stateChanges.next();
    }
  }
}
