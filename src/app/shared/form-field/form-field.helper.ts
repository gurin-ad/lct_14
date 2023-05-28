import { booleanProperty, Constructor } from '../helpers';

export interface FormField {
  hideError: boolean;
  small: boolean;
}

export type FormFieldCtor = Constructor<FormField>;

export function mixinFormField<T extends Constructor<{}>>(base: T): FormFieldCtor & T {
  return class extends base {
    private isHideError: boolean = false;
    private isSmall: boolean = false;

    get hideError() {
      return this.isHideError;
    }

    set hideError(value: any) {
      this.isHideError = booleanProperty(value);
    }

    get small() {
      return this.isSmall;
    }

    set small(value: any) {
      this.isSmall = booleanProperty(value);
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
