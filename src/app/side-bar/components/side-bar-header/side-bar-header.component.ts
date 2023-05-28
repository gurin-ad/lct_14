import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { content } from 'src/app/shared/tabs/animations.ts/animations';



@Component({
  selector: 'app-side-bar-header',
  templateUrl: './side-bar-header.component.html',
  styleUrls: ['./side-bar-header.component.scss'],
  animations: [content],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarHeaderComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.onClose.emit();
  }
}
