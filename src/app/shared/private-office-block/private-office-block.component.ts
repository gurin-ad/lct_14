import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-private-office-block',
  templateUrl: './private-office-block.component.html',
  styleUrls: ['./private-office-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateOfficeBlockComponent {
  @Input() name!: string;
  @Input() desc!: string;
  @Input() divider: boolean = true;
}
