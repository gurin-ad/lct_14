import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  private isOpenSideMenu$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedTopic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  public get isOpenSideMenu(): Observable<boolean> {
    return this.isOpenSideMenu$.asObservable();
  }

  public get isOpen(): boolean {
    return this.isOpenSideMenu$.value;
  }

  public setIsOpenSideMenu(isOpen: boolean): void {
    this.isOpenSideMenu$.next(isOpen);
  }

  public get selectedTopicId(): Observable<number | null> {
    return this.selectedTopic$.asObservable();
  }

  public setTopicId(id: number | null): void {
    this.selectedTopic$.next(id);
  }

}
