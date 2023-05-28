import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHelper } from '../interfaces/helper.interface';
import { HelperResponse } from '../interfaces/helper-response.type';

const res: HelperResponse = {
  Project: {
    VAT_refund: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    end_date: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    start_date: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
  },

  ProjectCompany: {
    VAT_d: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    coldate: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    igitdate: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    vat_tax: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
  },

  Company: {
    tyio_d: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    colilandate: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    TAX_igitdate: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
    name_tax: {
      id: 12,
      field: 'string',
      page: 'string',
      text: 'string',
      topic: 0,
    },
  }
}

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private _baseUrl: string = `${environment.apiUrl}/handbook`;

  constructor(private _http: HttpClient) {
  }
  
  getHelpers(page: string): Observable<HelperResponse> {
    return this._http.get<HelperResponse>(`${this._baseUrl}/helpers/`, {
      // observe: 'response',
      // responseType: 'json',
      params: {
        page,
      },
    });
  }
}


