import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectFormService } from 'src/app/services';
import { HelperModel } from 'src/app/shared/input-help/interfaces/helper-response.type';
import { IEquipment } from '../../interfaces';
import { equipments } from 'src/app/data';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentComponent implements OnInit, OnDestroy {
	equipments = equipments;
	form!: FormGroup;
	arrayData: IEquipment[] = [];
	tableData: IEquipment[] = [];
	dataHead: Record<string, string> = {
		name: 'Название объекта инвестирования',
		type: 'тип',
		price: 'Сумма капитальных расходов, руб.',
	}
	tableTitle: string = 'Оборудование'

	private _subs: Subscription[] = [];

	private _saved!: IEquipment[];
	get savedData(): IEquipment[] {
		return this._saved;
	}

	@Input() set savedData(savedData: IEquipment[] | undefined) {
		if (savedData?.length) {
			this._saved = savedData as IEquipment[];
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
			price: [0, Validators.required],
		});
		// if (this.savedData?.length) {
		// 	this.form.patchValue(this.savedData[0]);
		// 	this.form.updateValueAndValidity();
		// 	this._formStore.updateformData('equipment', this.savedData);
		// };
		this.arrayData.push(this.form.value);
		this._subs.push(this.form.valueChanges.subscribe(value => {
			this.arrayData[this.arrayData.length - 1] = value;
			this._formStore.updateformData('equipment', this.arrayData);
		}));
	}

	addToTable() {
		this.formInit();
		this.tableData.push(this.form.value);
	}


}


