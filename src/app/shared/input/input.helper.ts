import { booleanProperty, Constructor } from '../helpers';

export interface IInput {
  medium: boolean;
  small: boolean;
  disabled: boolean;
}

export type InputCtor = Constructor<IInput>;

export function mixinInput<T extends Constructor<{}>>(base: T): InputCtor & T {
  return class extends base {
    private isMedium: boolean = false;
    private isSmall: boolean = false;
    private isDisabled: boolean = false;

    get medium() {
      return this.isMedium;
    }

    set medium(value: any) {
      this.isMedium = booleanProperty(value);
    }

    get small() {
      return this.isSmall;
    }

    set small(value: any) {
      this.isSmall = booleanProperty(value);
    }

    get disabled() {
      return this.isDisabled;
    }

    set disabled(value: any) {
      this.isDisabled = booleanProperty(value);
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
