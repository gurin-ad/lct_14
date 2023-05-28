import { Component, ChangeDetectionStrategy, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private _snackbarService: SnackbarService,
    private _router: Router,
  ) {
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.dismiss();
      }
    });
  }

  dismiss() {
    this._snackbarService.snackbarRef?.dismiss();
  }
}
