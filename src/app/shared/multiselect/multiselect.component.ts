import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	HostListener,
	ElementRef,
	OnChanges,
	SimpleChanges,
	ChangeDetectorRef,
	forwardRef,
	OnDestroy,
} from '@angular/core';
import { IOption } from '../select/option.interface';
import { FormFieldControlDirective } from '../form-field/directives';
import { Subject } from 'rxjs';
import { DropdownAnimation } from '../select/dropdown.animation';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-multiselect',
	templateUrl: './multiselect.component.html',
	styleUrls: ['./multiselect.component.scss'],
	animations: [DropdownAnimation],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: FormFieldControlDirective, useExisting: MultiselectComponent },
	{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => MultiselectComponent),
		multi: true
	}
	],
})
export class MultiselectComponent implements FormFieldControlDirective<number[]>,ControlValueAccessor, OnChanges, OnDestroy {
	focused: boolean = false;
	controlType: string = 'select';
	stateChanges: Subject<void> = new Subject<void>();
	model: string | number = '';
	@Input() options?: IOption[];
	@Input() placeholder!: string;
	@Input() disabled: boolean = false;

	@Input()
	get value(): (number | string)[] {
		return this._value;
	}

	set value(newValue: (number | string)[] | undefined | null) {
		this._value = newValue || [];
	}

	private _value: (number | string)[] = [];

	@Output() onChange: EventEmitter<any> = new EventEmitter<any>();

	_onChange: (value: any) => void = () => {
	};
	_onTouched = () => {
	};

	constructor(
		private _elementRef: ElementRef<HTMLDivElement>,
		private cdr: ChangeDetectorRef
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.stateChanges.next();
		// if (changes['options']) {
		// 	this.showData = this.options;
		// }
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

	toggle() {
		this.focused = !this.focused;
		this.stateChanges.next();
	}

	checkboxToggle(value: number | string) {
		if (this.checkSelected(value)) {
			this.value = this.value.filter((v: number | string) => v !== value);
		} else {
			this.value = [...this.value, value];
		}
		this.onChange.emit(this.value);
		console.log(`multiselect`, this.value);
		this.stateChanges.next();
	}

	renderCheckbox(value: number | string): string {
		return `icon-checkbox${this.checkSelected(value) ? '-selected' : ''}`;
	}

	renderValue(): string {
		return this.value.length ? `Выбрано ${this.value.length}` : this.placeholder;
	}

	checkSelected(value: number | string): boolean {
		return this.value.includes(value);
	}

	@HostListener('document:click', ['$event.target'])
	outsideClick(targetElement: Node | null): void {
		if (this.focused && !this._elementRef.nativeElement.contains(targetElement)) {
			this.toggle();
		}
	}
}
