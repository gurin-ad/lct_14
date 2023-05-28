import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, OnDestroy, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFixedCosts, IOption } from '../../interfaces';
import { expenes } from 'src/app/data';

@Component({
	selector: 'app-fixed-costs',
	templateUrl: './fixed-costs.component.html',
	styleUrls: ['./fixed-costs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCostsComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	arrayData: IFixedCosts[] = [];
	tableData: IFixedCosts[] = [];

	expenses: any[] = expenes;
	// expenses: IOption[] = expenes;

	dataHead: Record<string, string> = {
		name: 'Наименование расхода',
		expenses: 'Выберите затраты',
		price: 'Ежемесячная сумма постоянных затрат, руб',
		calc_inflation: 'Инфляция',
	}
	tableTitle: string = 'Затраты: постоянные расходы';

	private _subs: Subscription[] = [];
	private _saved!: IFixedCosts[];
	get savedData(): IFixedCosts[] {
		return this._saved;
	}

	@Input() set savedData(savedData: IFixedCosts[] | undefined) {
		if (savedData?.length) {
			this._saved = savedData as IFixedCosts[];
			this.arrayData = savedData;
		}
	};
	@Output() onUpdateProduct: EventEmitter<{ control: string, value: any }> = new EventEmitter<{ control: string, value: any }>();

	constructor(
		private _fb: FormBuilder,
	) { }

	ngOnInit(): void {
		this.formInit();
	}

	ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}

	formInit() {

		console.log(`formInit`, this.arrayData);
		this.form = this._fb.group({
			name: ['', Validators.required],
			expenses: ['', Validators.required],
			price: [0, Validators.required],
			calc_inflation: [false, Validators.required],
		});
		// if (this.savedData?.length) {
		// 	this.form.patchValue(this.savedData[0]);
		// 	this.form.updateValueAndValidity();
		// 	this.onUpdateProduct.emit({ control: 'fixed_costs', value: this.arrayData });
		// } else {
			this.arrayData.push(this.form.value);

			this._subs.push(this.form.valueChanges.subscribe(value => {
				console.log(value);
				this.arrayData[this.arrayData.length - 1] = value;
				this.onUpdateProduct.emit({ control: 'fixed_costs', value: this.arrayData });
			}))
		// };
	}

	addToTable() {
		this.formInit();
		this.tableData.push(this.form.value);
		console.log(this.tableData);
		
	}
}