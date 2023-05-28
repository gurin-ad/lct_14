import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormFieldModule } from '../form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input/input.module';


@NgModule({
  declarations: [
    SelectComponent,
  ],
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule
  ],
  exports: [
    FormFieldModule,
    SelectComponent,

  ],
})
export class SelectModule {
}
