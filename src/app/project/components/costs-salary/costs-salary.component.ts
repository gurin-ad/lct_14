import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ISalary } from '../../interfaces';

@Component({
	selector: 'app-costs-salary',
	templateUrl: './costs-salary.component.html',
	styleUrls: ['./costs-salary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostsSalaryComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	private _subs: Subscription[] = [];

	private _saved!: ISalary;
	get savedData(): ISalary {
		return this._saved;
	}

	@Input() set savedData(savedData: ISalary | undefined) {
		if (savedData) {
			this._saved = savedData as ISalary;

		}
	};
	@Output() onUpdateProduct: EventEmitter<{ control: string, value: any }> = new EventEmitter<{ control: string, value: any }>();

	constructor(private _fb: FormBuilder,) { }

	ngOnInit(): void {
		this.form = this._fb.group({
			staff_number: [0, Validators.required],
			average_salary: [0, Validators.required],
			calc_inflation: [false, Validators.required],
		},
		);
		if (this.savedData) {
			this.form.patchValue(this.savedData);
			this.form.updateValueAndValidity();
			this.onUpdateProduct.emit({ control: 'salary', value: this.savedData });

		}
		this._subs.push(this.form.valueChanges.subscribe(value => {
			this.onUpdateProduct.emit({ control: 'salary', value });
			return this.form.valueChanges;
		}))
	}

	ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}
}
