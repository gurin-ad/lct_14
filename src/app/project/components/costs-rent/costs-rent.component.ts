import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IRent } from '../../interfaces';

@Component({
	selector: 'app-costs-rent',
	templateUrl: './costs-rent.component.html',
	styleUrls: ['./costs-rent.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostsRentComponent implements OnInit {
	form!: FormGroup;
	private _subs: Subscription[] = [];
	private _saved!: IRent;
	get savedData(): IRent {
		return this._saved;
	}

	@Input() set savedData(savedData: IRent | undefined) {
		if (savedData) {
			this._saved = savedData as IRent;

		}
	};
	@Output() onUpdateProduct: EventEmitter<{ control: string, value: any }> = new EventEmitter<{ control: string, value: any }>();


	constructor(private _fb: FormBuilder,) { }

	ngOnInit(): void {
		this.form = this._fb.group({
			square: [0, Validators.required],
			meter_price: [0, Validators.required],
			calc_inflation: [false, Validators.required],
		},
		);
		if (this.savedData) {
			this.form.patchValue(this.savedData);
			this.form.updateValueAndValidity();
			this.onUpdateProduct.emit({ control: 'rent', value: this.savedData });
		}
		this._subs.push(this.form.valueChanges.subscribe(value => {
			this.onUpdateProduct.emit({ control: 'rent', value });
			return this.form.valueChanges;
		}))
	}

	ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}
}