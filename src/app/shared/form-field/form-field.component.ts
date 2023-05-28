import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  ContentChild,
  AfterContentInit, ContentChildren, QueryList, ViewEncapsulation, Input,
} from '@angular/core';
import { FormField, FormFieldCtor, mixinFormField } from './form-field.helper';
import {
  APP_ERROR,
  APP_LABEL,
  APP_PREFIX,
  APP_SUBLABEL,
  APP_SUFFIX, ErrorDirective,
  FormFieldControlDirective,
  LabelDirective,
  PrefixDirective,
  SubLabelDirective,
  SuffixDirective,
} from './directives';
import { startWith } from 'rxjs';

const FormFieldBase: FormFieldCtor = mixinFormField(
  class {
    constructor(
      public _elementRef: ElementRef,
      public _changeDetectorRef: ChangeDetectorRef,
    ) {
    }
  },
);

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  host: {
    'class': 'app-form-field',
    '[class.border]': 'border',
    '[class.focused]': 'control.focused',
    '[class.filled]': 'checkFilled()',
    '[class.error]': 'errorChildren?.length && control.touched && !control.focused || checkTouched',
    '[class.disabled]': 'disabled',
  },
  inputs: ['hideError', 'small', 'class'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent extends FormFieldBase implements AfterContentInit, FormField {
  @Input() disabled: boolean = false;
  @Input() checkTouched: boolean = false;
  @Input() border: boolean = true;
  @ContentChild(FormFieldControlDirective) control!: FormFieldControlDirective<any>;
  @ContentChildren(APP_ERROR, { descendants: true }) errorChildren?: QueryList<ErrorDirective>;
  @ContentChildren(APP_LABEL, { descendants: true }) labelChildren?: QueryList<LabelDirective>;
  @ContentChildren(APP_PREFIX, { descendants: true }) prefixChildren?: QueryList<PrefixDirective>;
  @ContentChildren(APP_SUFFIX, { descendants: true }) suffixChildren?: QueryList<SuffixDirective>;
  @ContentChildren(APP_SUBLABEL, { descendants: true }) subLabelChildren?: QueryList<SubLabelDirective>;

  isShowedPassword: boolean = false;

  constructor(
    public elementRef: ElementRef,
    public changeDetectorRef: ChangeDetectorRef,
  ) {
    super(elementRef, changeDetectorRef);
  }

  ngAfterContentInit() {
    if (this.control.controlType) {
      this.elementRef.nativeElement.classList.add(this.control.controlType);
    }

    this.control.stateChanges?.pipe(startWith(null)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });


  }

  checkFilled(): boolean {
    if (this.control.controlType === 'select') {
      if (typeof this.control.value === 'object') {
        return this.control.value?.length;
      } else {
        return this.control.value !== undefined && this.control.value !== null;
      }
    } else {
      return this.control.value;
    }
  }

  switchShowedPassword() {
    this.isShowedPassword = !this.isShowedPassword;
    this.control.type = this.isShowedPassword ? 'text' : 'password';
  }

  setPasswordIconClass(): string {
    return this.isShowedPassword ? 'icon-eye' : 'icon-eye-hide';
  }
}
