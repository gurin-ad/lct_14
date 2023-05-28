import { Injectable } from '@angular/core';
import { IProject } from '../project/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

type IProjectKey = keyof IProject;
@Injectable({
	providedIn: 'root'
})
export class ProjectFormService {

	private _formData: BehaviorSubject<IProject | null> = new BehaviorSubject<IProject | null>(null);
	constructor(private _storage: StorageService) { }

	getformData() {
		return this._formData.value;
	}

	updateformData<T>(key: IProjectKey, formData: T) {
		let data = this._formData.value;
		this._formData.next({ ...data, [key]: formData });
		this._storage.saveData({ ...data, [key]: formData })
	}

}
