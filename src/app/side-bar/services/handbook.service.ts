import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandbookService {
  private _baseUrl: string = `${environment.apiUrl}/handbook`;

  constructor(private _http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this._http.get(`${this._baseUrl}/categories/`);
  }

  getTopics(id: number): Observable<any> {
    return this._http.get(`${this._baseUrl}/topics/${id}/`);
  }
}
