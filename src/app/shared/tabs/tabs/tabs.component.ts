import { Component, OnInit, ChangeDetectionStrategy, AfterContentInit, ContentChildren, QueryList, EventEmitter, Output, Input } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit, AfterContentInit {
  @Input() marginLeft = false;
  @Output() onSelectTab: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs?.first);
    }

  }

  selectTab(tab: any) {
    if (tab.disable) return;

    this.onSelectTab.emit(tab?.tab);
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }
}
