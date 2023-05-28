import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectFormService } from 'src/app/services';
import { HelperModel } from 'src/app/shared/input-help/interfaces/helper-response.type';
import { IRealty } from '../../interfaces';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-realty',
	templateUrl: './realty.component.html',
	styleUrls: ['./realty.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtyComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	type = [
		{ name: 'Земельный участок' },
		{ name: 'Здание' },
	];


	arrayData: IRealty[] = [];
	tableData: IRealty[] = [];
	dataHead: Record<string, string> = {
		name: 'Название объекта инвестирования',
		type: 'Тип объекта',
		location: 'Адрес',
		square: 'Площадь, кв. м',
		price: 'Сумма капитальных расходов, руб.',
	}
	tableTitle: string = 'Недвижимость'

	private _subs: Subscription[] = [];

	private _saved!: IRealty[];
	get savedData(): IRealty[] {
		return this._saved;
	}

	@Input() set savedData(savedData: IRealty[] | undefined) {
		if (savedData?.length) {
			this._saved = savedData as IRealty[];
			this.arrayData = savedData;
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
			type: ['', Validators.required],
			location: ['', Validators.required],
			square: [0, Validators.required],
			price: [0, Validators.required],
		},
		);

		// if (this.savedData?.length) {
		// 	this.form.patchValue(this.savedData[0]);
			this.form.get('square')?.setValue(0);
			this.form.get('price')?.setValue(0);
		// 	this._formStore.updateformData('realty', this.arrayData);
		// };
		this.arrayData.push(this.form.value);

		this._subs.push(this.form.valueChanges.subscribe(value => {
			this.arrayData[this.arrayData.length - 1] = value;
			this._formStore.updateformData('realty', this.arrayData);
		}));
	}

	addToTable() {
		this.formInit();
		this.tableData.push(this.form.value);
	}
}
