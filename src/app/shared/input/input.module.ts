import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormFieldModule } from '../form-field/form-field.module';


@NgModule({
  declarations: [
    InputComponent,
  ],
  imports: [
    CommonModule,
    FormFieldModule,
  ],
  exports: [
    InputComponent,
    FormFieldModule,
  ],
})
export class InputModule {
}
