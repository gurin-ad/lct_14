import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '..';
import { InputHelpComponent } from './input-help.component';


@NgModule({
  declarations: [
    InputHelpComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [
    InputHelpComponent,
  ],
})
export class InputHelpModule {
}
