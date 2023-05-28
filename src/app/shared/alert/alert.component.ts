import { Component, ChangeDetectionStrategy, Input, HostBinding, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges } from '@angular/core';
import { IAlert } from './alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnChanges {

  ngOnChanges() {
    switch (this.alertMessage?.type) {
      case 'ERROR':
        this.background = '#FDEBEB'
        break;
      case 'ALERT':
        this.background = '#FFF4DC'
        break;

      default:
        this.background = '#E0E0E0'
        break;
    }
  }

  @Input() alertMessage!: IAlert | null;

  @HostBinding('style.background') background!: string;
  @HostBinding('style.color') color!: string;
  @HostBinding('style.display') display!: string;

  ngOnInit(): void {
  }

  close(): void {
    this.display = 'none';
  }

}
