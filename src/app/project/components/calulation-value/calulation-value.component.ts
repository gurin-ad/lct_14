import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ICalcValue } from '../../interfaces/calculation-value.interface';

@Component({
	selector: 'app-calulation-value',
	templateUrl: './calulation-value.component.html',
	styleUrls: ['./calulation-value.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalulationValueComponent implements OnInit {

	@Input() calcValue!: ICalcValue;

	constructor() { }

	ngOnInit(): void {
		console.log(`calcValue`,this.calcValue );
	}

	redirectTo() {
		window.open(this.calcValue.pdf_url, '_blank');
	}
}

