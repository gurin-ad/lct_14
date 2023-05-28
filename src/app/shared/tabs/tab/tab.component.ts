import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild } from '@angular/core';
import { fade, slideUp } from '../animations.ts/animations';



@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    fade,
    slideUp
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {

  @Input('tabTitle') title!: string;
  @Input() tab: any | null | undefined;
  @Input() active: boolean = false;
  @Input() disable: boolean = false;


  constructor() { }

  ngOnInit(): void {

  }

}
