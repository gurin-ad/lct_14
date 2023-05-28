import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ICategories } from '../../interfaces/categories.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { fade, slideUp } from 'src/app/shared/tabs/animations.ts/animations';

@Component({
  selector: 'app-side-bar-navigation',
  templateUrl: './side-bar-navigation.component.html',
  styleUrls: ['./side-bar-navigation.component.scss'],
  animations: [
    fade,
    slideUp,
    trigger(
      'content', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate('200ms ease-in', style({ height: 0 })),
      ]),
    ],
    ),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarNavigationComponent implements OnInit {
  open: boolean = false;
  selectedId: number | undefined | null;
  @Input() hidden: boolean = false;
  @Input() categories!: ICategories[];
  @Input() selectCategorieId!: number | null | undefined;
  @Output() onSelectTopic: EventEmitter<number> = new EventEmitter<number>();

 selectedCategoryId!: number;
  selectedTopicId!: number | null;

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.selectedTopicId = null;
  }

  constructor() { }

  ngOnInit(): void {
    this.selectCategorie(this.selectCategorieId);
  }

  selectCategorie(id: number | null | undefined) {
    if (this.selectedId === id) {
      this.selectedId = undefined;
      return
    }
    this.selectedId = id;
    this.open = !this.open
  }


  selectTopic(id: number) {
    this.onSelectTopic.emit(id);
  }

}


