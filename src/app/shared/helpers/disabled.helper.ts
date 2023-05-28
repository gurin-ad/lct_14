import { Constructor } from './constructor.helper';
import { booleanProperty } from './boolean-property.helper';

export interface IDisable {
  disabled: boolean;
}

export type CanDisableCtor = Constructor<IDisable>;

export function mixinDisabled<T extends Constructor<{}>>(base: T): CanDisableCtor & T {
  return class extends base {
    private isDisabled: boolean = false;

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
