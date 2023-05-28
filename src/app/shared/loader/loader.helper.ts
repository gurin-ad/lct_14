import { booleanProperty, Constructor } from '../helpers';

export interface ILoader {
  absolute: boolean;
}

export type LoaderCtor = Constructor<ILoader>

export function mixinLoader<T extends Constructor<{}>>(base: T): LoaderCtor & T {
  return class extends base {
    private _isAbsolute = false;

    get absolute() {
      return this._isAbsolute;
    }

    set absolute(value: boolean) {
      this._isAbsolute = booleanProperty(value);
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
