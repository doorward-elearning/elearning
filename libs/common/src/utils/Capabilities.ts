import { Enum } from '@doorward/common/types';

export default class Capabilities<T extends Enum<T>> {
  private readonly capabilities: Record<keyof T, boolean>;

  constructor(enumeration: T, initial: Array<keyof T>) {
    this.capabilities = Object.keys(enumeration).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: !!initial.find(cap => cap === enumeration[cur]),
      };
    }, {}) as Record<keyof T, boolean>;
  }

  clear() {
    Object.keys(this.capabilities).forEach(value => {
      this.remove(value as keyof T);
    });
  }

  remove(capability: keyof T) {
    this.capabilities[capability] = false;
  }

  add(capability: keyof T) {
    this.capabilities[capability] = true;
  }

  has(capability: keyof T) {
    return this.capabilities[capability];
  }

  toggle(capability: keyof T) {
    this.capabilities[capability] = !this.capabilities[capability];
  }
}
