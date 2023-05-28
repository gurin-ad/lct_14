import { booleanProperty, Constructor } from '../helpers';

export interface ILink {
  small: boolean;
}

export type LinkCtor = Constructor<ILink>;

export function mixinLink<T extends Constructor<{}>>(base: T): LinkCtor & T {
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
