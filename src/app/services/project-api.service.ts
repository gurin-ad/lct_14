import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOption, IProject } from '../project/interfaces';
import { SnackbarService } from '../shared';
import { ICalcValue } from '../project/interfaces/calculation-value.interface';

@Injectable({
	providedIn: 'root'
})
export class ProjectApiService {
	private _baseUrl: string = `${environment.apiUrl}`;
	private _mainUrl: string = `${environment.apiMainUrl}/projects`;

	constructor(
		private _http: HttpClient,
		private _snackbarService: SnackbarService
	) {
	}

	submitForm(form: IProject): Observable<ICalcValue> {
		console.log(`api`, form);
		return this._http.post<ICalcValue>(`${this._baseUrl}/calc/`, {
			...form
		}).pipe(
			catchError(error => {
				console.error('An error occurred:', error);
				this._snackbarService.openSnackBar('Что-то пошло не так... Некорректно заполнены данные');
				return throwError(error);
			})
		);;
	}

	getIndustries(): Observable<IOption[] | null> {
		let headers = new HttpHeaders({
			Authorization: `${environment.authMainApi}`
		});
		return this._http.get<IOption[]>(`${this._mainUrl}/industries/`, { headers: headers });
	}

	getSegments(industry: number): Observable<IOption[]> {
		let headers = new HttpHeaders({
			Authorization: `${environment.authMainApi}`
		});
		return this._http.get<IOption[]>(`${this._mainUrl}/segments/`, {
			headers: headers,
			params: { industry },
		});
	}
}
