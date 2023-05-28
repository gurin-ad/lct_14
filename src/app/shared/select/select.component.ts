import {
  Component,
  HostListener,
  Input,
  ElementRef,
  ChangeDetectorRef, OnDestroy, OnChanges, AfterViewInit, Output, EventEmitter, OnInit, forwardRef, AfterViewChecked, AfterContentChecked, SimpleChanges,
} from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldControlDirective } from '../form-field/directives';
import { DropdownAnimation } from './dropdown.animation';
import { IOption } from './option.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [DropdownAnimation],
  providers: [
    { provide: FormFieldControlDirective, useExisting: SelectComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
})
export class SelectComponent implements FormFieldControlDirective<string | number | number[] | null>, ControlValueAccessor, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, OnChanges, OnDestroy {
  @Input() options?: IOption[] | undefined | null;
  @Input() placeholder!: string;

  @Input()
  get value(): string | number | number[] | null {
    return this._value;
  }

  set value(newValue: any) {
    this._value = newValue;
  }

  model: string | number = ''
  showData: IOption[] | undefined | null;
  private _value: any = undefined;
  focused: boolean = false;
  controlType: string = 'select';
  touched: boolean = false;
  stateChanges: Subject<void> = new Subject<void>();

  @Input() disabled: boolean = false;
  @Input() disableActions: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  _onChange: (value: any) => void = () => {
  };
  _onTouched = () => {
  };

  constructor(
    private elementRef: ElementRef<HTMLDivElement>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngAfterViewChecked(): void {
  }

  ngAfterContentChecked(): void {

  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.stateChanges.next();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stateChanges.next();
    if (changes['options']) {
      this.showData = this.options;
    }
    this.model = this.renderValue();

  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  writeValue(value: any): void {
    this.value = value;
    this.model = this.renderValue();
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }

  toggle(): void {
    this.focused = !this.focused;
    this._onTouched();
    this.touched = true;
    this.stateChanges.next();

  }

  renderValue(): string {
    const option = this.options?.find((option) => option.name === this.value);
    return (option !== undefined && option !== null) ? option.name : '';
  }

  select(value: string | number): void {
    this.onChange.emit(value);
    this.writeValue(value);
    this._onChange(this.value);
    this._onTouched();
    this.focused = false;
    this.stateChanges.next();
    this.showData = this.options;
  }

  search(event: any): void {
    if (this.options) {
      this.showData = this.options.filter((item: any) => {
        return item.name.toLowerCase().includes(event.toLowerCase());
      }
      );
    }

  }

  @HostListener('document:click', ['$event.target'])
  outsideClick(targetElement: Node | null): void {
    if (this.focused && !this.elementRef.nativeElement.contains(targetElement)) {
      this.focused = false;
      this.model = this.renderValue();
      this.showData = this.options;
      this.stateChanges.next();
    }
  }
}
