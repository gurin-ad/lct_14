import { Injectable } from '@angular/core';
import { IProject } from '../project/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private storageKey = 'formData';

	constructor() { }

	saveData(data: IProject) {
		localStorage.setItem(this.storageKey, JSON.stringify(data));
	}

	deleteData() {
		localStorage.removeItem(this.storageKey);
	}

	getData(): IProject | null {
		let value = localStorage.getItem(this.storageKey);
		if (value) {
			let obj = JSON.parse(value);
			return obj;
		}
		return null;
	}

}

