import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectFormService } from '../services/project-form.service';
import { ProjectApiService } from '../services/project-api.service';
import { IOption, IProject } from './interfaces';
import { StorageService } from '../services';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICalcValue } from './interfaces/calculation-value.interface';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
	showCalcValue: boolean = false;
	savedData!: IProject;
	calcValue!: ICalcValue;
	industries!: Observable<IOption[] | null>;
	private _subs: Subscription[] = [];

	constructor(
		private _cdr: ChangeDetectorRef,
		private _fb: FormBuilder,
		private _formStore: ProjectFormService,
		private _http: ProjectApiService,
		private _storage: StorageService,
	) {

	}
	ngOnInit(): void {
		let data = this._storage.getData();
		if (data) {
			this.savedData = data;
		}
		this.industries = this._http.getIndustries()

	}

	ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}

	submitForm() {
		let data = this._formStore.getformData() as IProject;
		this._subs.push(this._http.submitForm(data).subscribe((data) => {
			this.calcValue = data;
			this.showCalcValue = true;
			this._cdr.detectChanges();
			this._storage.deleteData()
		}));

	}

	redirectTo() {
		window.open(environment.linkMap, '_blank');
	}
}
