import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, of, switchMap } from 'rxjs';
import { ProjectApiService, ProjectFormService } from 'src/app/services';
import { HelperModel } from 'src/app/shared/input-help/interfaces/helper-response.type';
import { location } from '../../../data';
import { IOption, IPassport, IProject } from '../../interfaces';

@Component({
	selector: 'app-passport',
	templateUrl: './passport.component.html',
	styleUrls: ['./passport.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('0.5s ease-out', style({ opacity: 1 }))
			]),
		])
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	location = location;
	segments!: IOption[] | null;
	taxTypeDisabled = false;
	segmentsDisabled = false;
	private _subs: Subscription[] = [];

	private _project_industry: IOption[] = [
		{ name: 'Тип 1' },
		{ name: 'Тип 2' },
		{ name: 'Тип 3' },
		{ name: 'Тип 4' },
	];
	get project_industry(): IOption[] {
		return this._project_industry;
	}
	// segments = [
	// 	{ name: 'Тип 1' },
	// 	{ name: 'Тип 2' },
	// 	{ name: 'Тип 3' },
	// 	{ name: 'Тип 4' },
	// ];

	@Input() organizational: any[] = [
		{ name: 'Индивидуальный предприниматель' },
		{ name: 'ООО' },
		{ name: 'АО' },
		{ name: 'ИП (не самозанятый)' },
		{ name: 'Самозанятый' },
		{ name: 'Товарищество' },
		{ name: 'Партнерство' },
		{ name: 'Кооператив (артель)' },
	];

	@Input() taxes: any[] = [
		{ name: 'Общий режим' },
		{ name: 'УСН (6 %)' },
		{ name: 'УСН (15 %)' },
		{ name: 'Патент' },
		{ name: 'Самозанятый' },
	];

	private _saved!: IPassport;
	get savedData(): IPassport {
		return this._saved;
	}

	@Input() set industries(industry: IOption[] | null) {
		if (industry) {
			this._project_industry = industry as IOption[];

		}
	};
	@Input() set savedData(savedData: IPassport | undefined) {
		if (savedData) {
			this._saved = savedData as IPassport;

		}
	};

	@Input() helpers!: HelperModel | undefined;

	@Output() onUpdateProduct: EventEmitter<{ id: number, field: any }> = new EventEmitter<{ id: number, field: any }>();

	constructor(
		private _fb: FormBuilder,
		private _formStore: ProjectFormService,
		private _http: ProjectApiService,
	) {

	}

	ngOnInit(): void {
		this.form = this._fb.group({
			project_name: ['', Validators.required],
			initiator_name: ['', Validators.required],
			organizational_form: ['', Validators.required],
			project_industry: ['', Validators.required],
			segments: ['', Validators.required],
			tax_type: ['', Validators.required],
			location: ['', Validators.required],
		},
		);
		if (this.savedData) {
			this.form.patchValue(this.savedData);
			this.form.get('project_industry')?.patchValue('');
			this.form.updateValueAndValidity();
			console.log(`passport value:`, this.form.value);
			this._formStore.updateformData('passport', this.form.value);
		};

		this._subs.push(this.form.valueChanges.subscribe(value => {
			console.log(`passport`, value);
			this._formStore.updateformData('passport', value)
			return this.form.valueChanges;
		}));

		if (this.form.get('project_industry')) {
			this._subs.push(
				this.form.get('project_industry')!.valueChanges.pipe(
					switchMap(value => {
						let industryObject = this.project_industry.find(item => item.name === value);
						if (industryObject) {
							let industryId = industryObject.id;
							return this._http.getSegments(industryId!);
						} else {
							return of(null);
						}
					})
				).subscribe(segments => {
					this.segments = segments;
					this.segmentsDisabled = true;
				})
			)
		};
		if (this.form.get('organizational_form')) {
			this._subs.push(this.form.get('organizational_form')!.valueChanges.subscribe(value => {
				if (value === 'Самозанятый') {
					this.form.get('tax_type')?.setValue('Самозанятый')
					this.taxTypeDisabled = true;
				} else {
					this.form.get('tax_type')?.setValue('')
					this.taxTypeDisabled = false;

				}
			}))
		};
	}

	ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}

	select(event: string[]) {
		let data = this.form.value;
		if (data) {
			data.segments = event;
			this._formStore.updateformData('passport', data);
		}
	}
}

