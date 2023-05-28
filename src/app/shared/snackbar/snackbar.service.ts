import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackbarRef: MatSnackBarRef<SnackbarComponent> | undefined;

  constructor(
    private _matSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {
  }

  openSnackBar(message: string, type: 'success' | 'error' = 'error') {
    if (isPlatformBrowser(this._platformId)) {
      this.snackbarRef = this._matSnackBar.openFromComponent(SnackbarComponent, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['app-snackbar', type],
        data: message,
      });
    }
  }

  closeSnackBar() {
    this.snackbarRef?.dismiss();
  }
}
