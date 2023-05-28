import { Constructor } from './constructor.helper';
import { booleanProperty } from './boolean-property.helper';

export interface IFull {
  full: boolean;
}

export type CanFullCtor = Constructor<IFull>;

export function mixinFull<T extends Constructor<{}>>(base: T): CanFullCtor & T {
  return class extends base {
    private isFull: boolean = false;

    get full() {
      return this.isFull;
    }

    set full(value: any) {
      this.isFull = booleanProperty(value);
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
