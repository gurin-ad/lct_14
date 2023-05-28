import { booleanProperty, Constructor } from '../helpers';

export interface IButton {
  small: boolean;
}

export type ButtonCtor = Constructor<IButton>;

export function mixinButton<T extends Constructor<{}>>(base: T): ButtonCtor & T {
  return class extends base {
    private isSmall: boolean = false;

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
