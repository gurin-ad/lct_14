import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMaterials } from '../../interfaces';

@Component({
	selector: 'app-costs-materals',
	templateUrl: './costs-materals.component.html',
	styleUrls: ['./costs-materals.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostsMateralsComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	arrayData: IMaterials[] = [];
	tableData: IMaterials[] = [];
	
	dataHead: Record<string, string> = {
		name: 'Наименование расхода',
		number_per_product: 'Кол-во материалов на 1 ед. продукции',
		price: 'Цена 1 ед. материалов, руб.',
		calc_inflation: 'Инфляция',
	}
	tableTitle: string = 'Затраты: сырье и материалы';

	private _subs: Subscription[] = [];
	private _saved!: IMaterials[];
	get savedData(): IMaterials[] {
		return this._saved;
	}

	@Input() set savedData(savedData: IMaterials[] | undefined) {
		if (savedData?.length) {
			this._saved = savedData as IMaterials[];
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
		this.form = this._fb.group({
			name: ['', Validators.required],
			number_per_product: [0, Validators.required],
			price: [0, Validators.required],
			calc_inflation: [false, Validators.required],
		});
		// if (this.savedData?.length) {
		// 	this.form.patchValue(this.savedData[0]);
		// 	this.form.updateValueAndValidity();
		// 	this.onUpdateProduct.emit({ control: 'materials', value: this.arrayData })
		// } else {
			this.arrayData.push(this.form.value);

			this._subs.push(this.form.valueChanges.subscribe(value => {
				this.arrayData[this.arrayData.length - 1] = value;
				this.onUpdateProduct.emit({ control: 'materials', value: this.arrayData })
			}));
		// }
	}

	addToTable() {
		this.formInit();
		this.tableData.push(this.form.value);
	}
}