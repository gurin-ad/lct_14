import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectFormService } from 'src/app/services';
import { HelperModel } from 'src/app/shared/input-help/interfaces/helper-response.type';
import { IRealty, ISales } from '../../interfaces';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	clients_type = [
		{ name: 'Юр. лица' },
		{ name: 'Физ. лица' }
	]

	private _subs: Subscription[] = [];

	private _saved!: ISales;
	get savedData(): ISales {
		return this._saved;
	}

	@Input() set savedData(savedData: ISales | undefined) {
		if (savedData) {
			this._saved = savedData as ISales;

		}
	};
	@Input() helpers!: HelperModel | undefined;

	@Output() onUpdateProduct: EventEmitter<{ id: number, field: any }> = new EventEmitter<{ id: number, field: any }>();

	constructor(
		private _fb: FormBuilder,
		private _formStore: ProjectFormService,
	) {

	}

	ngOnInit(): void {
		this.formInit();
	}

	ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}

	formInit() {
		this.form = this._fb.group({
			name: ['', Validators.required],
			clients_type: ['', Validators.required],
			sales_duration: [0, [Validators.required, Validators.min(0), Validators.max(30)]],
			sales_volume: [0, Validators.required],
			annual_sales_growth: [0, Validators.required],
			price: [0, Validators.required],
			annual_inflation: [0, Validators.required],
		},
		);
		if (this.savedData) {
			this.form.patchValue(this.savedData);
			this.form.updateValueAndValidity();
			this._formStore.updateformData('sales', this.savedData);
		}
		// this.form.get('sales_duration')?.setValue(0);
		// this.form.get('sales_volume')?.setValue(0);
		// this.form.get('annual_sales_growth')?.setValue(0);
		// this.form.get('annual_inflation')?.setValue(0);
		// this.form.get('price')?.setValue(0);
		// this.form.updateValueAndValidity();
		this._subs.push(this.form.valueChanges.subscribe(value => {
			this._formStore.updateformData('sales', value);
		}));
	}

}
