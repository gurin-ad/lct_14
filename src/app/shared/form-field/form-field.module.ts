import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { ErrorDirective, LabelDirective, PrefixDirective, SubLabelDirective, SuffixDirective } from './directives';
import { InputHelpModule } from '../input-help/input-help.module';


@NgModule({
  declarations: [
    FormFieldComponent,
    ErrorDirective,
    LabelDirective,
    PrefixDirective,
    SuffixDirective,
    SubLabelDirective,
  ],
  imports: [
    CommonModule,
    InputHelpModule,
  ],
  exports: [
    FormFieldComponent,
    ErrorDirective,
    LabelDirective,
    SubLabelDirective,
    PrefixDirective,
    SuffixDirective,
    InputHelpModule,
  ],
})
export class FormFieldModule {
}
