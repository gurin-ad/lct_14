import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { ICosts, IEquipment, IProject, IRealty, ISales } from '../../interfaces';

type IData = IProject | ISales | ICosts | IEquipment | IRealty;
type IDataWithIndex = IData & { [key: string]: any };

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

	 filterData!: any[];

	private _data!: any[];
	get data() {
		return this._data;
	}

	@Input() set data(data: any[]) {
		this._data = data as any[];
	};

	@Input() dataHead!: Record<string, string>;
	@Input() title!: string;

	@Output() onClose: EventEmitter<void> = new EventEmitter<void>();
	constructor() { }

	ngOnInit(): void {
		this.filterData = this.data;
	}

	deleteRow(i: number) {
		this.filterData = this.filterData.filter((item, index) => index !== i)
	}
}
