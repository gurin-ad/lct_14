import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectFormService } from 'src/app/services';
import { ICosts } from '../../interfaces';

@Component({
	selector: 'app-cost',
	templateUrl: './cost.component.html',
	styleUrls: ['./cost.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostComponent {
	cost_value!: ICosts;

	get savedData(): ICosts {
		return this.cost_value;
	}

	@Input() set savedData(savedData: ICosts | undefined) {
		if (savedData) {
		this.cost_value = savedData as ICosts;
			
		}
	};
	@Output() onUpdateProduct: EventEmitter<{ id: number, field: any }> = new EventEmitter<{ id: number, field: any }>();

	constructor(
		private _formStore: ProjectFormService,
	) { }

	updateformData(event: { control: string, value: any }) {
		console.log(`updateformData`, event);
		let obj = { [event.control]: event.value };
		this.cost_value = { ...this.cost_value, ...obj };
		this._formStore.updateformData('costs', this.cost_value);
	}
}
