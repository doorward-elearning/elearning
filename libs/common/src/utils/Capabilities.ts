import { Enum } from '@doorward/common/types';

export default class Capabilities<T extends Enum<T>> {
  private readonly capabilities: Record<keyof T, boolean>;

  constructor(enumeration: T, initial: Array<keyof T> | Record<keyof T, boolean>) {
    if ((initial as Array<keyof T>).length) {
      this.capabilities = Object.keys(enumeration).reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: !!(initial as Array<keyof T>).find(cap => cap === enumeration[cur]),
        };
      }, {}) as Record<keyof T, boolean>;
    } else {
      this.capabilities = initial as Record<keyof T, boolean>;
      this.capabilities = Object.keys(enumeration).reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: this.capabilities[cur],
        };
      }, {}) as Record<keyof T, boolean>;
    }
  }

  clear(): Capabilities<T> {
    Object.keys(this.capabilities).forEach(value => {
      this.remove(value as keyof T);
    });
    return this;
  }

  remove(...capabilities: Array<keyof T>): Capabilities<T> {
    capabilities.forEach(capability => {
      this.capabilities[capability] = false;
    });
    return this;
  }

  add(...capabilities: Array<keyof T>): Capabilities<T> {
    capabilities.forEach(capability => {
      this.capabilities[capability] = true;
    });
    return this;
  }

  has(...capabilities: Array<keyof T>) {
    return !capabilities.find(capability => !this.capabilities[capability]);
  }

  toggle(...capabilities: Array<keyof T>): Capabilities<T> {
    capabilities.forEach(capability => {
      this.capabilities[capability] = !this.capabilities[capability];
    });
    return this;
  }
}
