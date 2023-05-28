import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener } from '@angular/core';
import { HelperService } from './services/helper.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IHelper } from './interfaces/helper.interface';
import { SideMenuService } from 'src/app/side-bar/services/side-menu.service';

@Component({
  selector: 'app-input-help',
  templateUrl: './input-help.component.html',
  styleUrls: ['./input-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputHelpComponent implements OnInit {
  isOpened: boolean = false;
  @Input() field!: IHelper | undefined;

  constructor(
    private _helperService: HelperService,
    private _sideMenu: SideMenuService,
  ) {

  }


  ngOnInit(): void {
  }

  @HostListener("mouseenter", ['$event']) onMouseEnter(event: Event) {
    this.isOpened = true;
  }

  @HostListener("click", ['$event']) onMouseClick(event: Event) {
    // this.button.elementRef.nativeElement.click();
  }

  @HostListener("mouseleave", ['$event']) onMouseLeave(event: Event) {
    this.isOpened = false;
  }


  openSideMenu() {
      this._sideMenu.setIsOpenSideMenu(true);
    if (this.field) this._sideMenu.setTopicId(this.field.topic);

  }
}
