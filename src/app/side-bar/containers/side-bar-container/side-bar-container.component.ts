import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HandbookService } from '../../services/handbook.service';
import { ICategories } from '../../interfaces/categories.interface';
import { EMPTY, Observable, Subscription, map, mergeAll, mergeMap, of, switchAll, switchMap } from 'rxjs';

import { ITopic } from '../../interfaces/topic.interface';
import { fade, slideUp, content } from 'src/app/shared/tabs/animations.ts/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import { SideMenuService } from '../../services/side-menu.service';

@Component({
  selector: 'app-side-bar-container',
  templateUrl: './side-bar-container.component.html',
  styleUrls: ['./side-bar-container.component.scss'],
  animations: [
    fade,
    slideUp,
    trigger('content', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)', opacity: 0, alignItems: 'center',
        }),
        animate('500ms cubic-bezier(.61, .29, .07, 1.02)', style({
          transform: 'translateX(0)',
          opacity: 1
        })),
      ]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarContainerComponent implements OnInit, OnDestroy {
private _store: any = {};
selectTopicId!: any;
selectCategorieId!: any;
isTopic!: any;
isCategories!: any;

  topicID$: Observable<number | undefined> =of(1);
  categoryID$: Observable<number | undefined> = of(1);
  showTopic$: Observable<boolean> = of(true);
  showCategories$: Observable<boolean> = of(true);

  subs: Subscription[] = [];
  sidebarShow!: Observable<boolean>;
  categories!: ICategories[];
  titleTopic!: string;
  theory!: string;
  examples!: string;

  constructor(
    private _handbook: HandbookService,
    public sanitizer: DomSanitizer,
    private _sideMenu: SideMenuService,
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    // this.subs.push((this._handbook.getCategories()
    //   .subscribe((arg: ICategories[]) => {
    //     this.categories = arg;
    //   })));
    this.sidebarShow = this._sideMenu.isOpenSideMenu;
    this.subs.push(this.sidebarShow
      .pipe(
        map(res => {
          if (res) {
            return this._sideMenu.selectedTopicId
          } else {
            return EMPTY
          }
        }),
        switchAll()
      )
      .subscribe(res => {
        this.titleHandler('to-topic');
        this.selectTopic(res as number);
      }))
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.close();
  }

  close(): void {
    this._sideMenu.setIsOpenSideMenu(false);
  }

  titleHandler(rout: string): void {
    switch (rout) {
      case 'to-category':
        // this._store.dispatch(showCategories({ isCategories: true }));
        // this._store.dispatch(showTopic({ isTopic: false }));
        break;
      case 'to-topic':
        // this._store.dispatch(showTopic({ isTopic: true }));
        // this._store.dispatch(showCategories({ isCategories: false }));
        break;
    }
  }

  selectTopic(id: number): void {
    if (!id) return;
    this.subs.push(this._handbook.getTopics(id).subscribe((topic: ITopic) => {
      this.titleTopic = topic.name;
      this.theory = topic.theory;
      this.examples = topic.examples;
      // this._store.dispatch(setSelectedTopicId({ topicId: topic.id }));
      // this._store.dispatch(setSelectedCategoryId({ categoryId: topic.category }));
      this.titleHandler('to-topic')

    }));
    this._sideMenu.setTopicId(null);
  }

  showSidebar() {
    this._sideMenu.setIsOpenSideMenu(true);
    this.titleHandler('to-category')
  }

  onRedirect(topicId: number) {
    this.selectTopic(topicId);
  }
}

