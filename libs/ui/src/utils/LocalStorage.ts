import Tools from '@doorward/common/utils/Tools';

export default class LocalStorage {
  static get<T>(key: string, defaultValue: T = null): T {
    try {
      return JSON.parse(Tools.decrypt(localStorage.getItem(key)));
    } catch (e) {
      return defaultValue;
    }
  }

  static getOrSet<T>(key: string, valueToSet: T): T {
    const value = LocalStorage.get(key, valueToSet) as T;
    LocalStorage.set(key, value);

    return value;
  }

  static getAndRemove<T>(key: string, defaultValue: T = null): T {
    const value = LocalStorage.get(key, defaultValue);

    LocalStorage.remove(key);

    return value;
  }

  static set<T>(key: string, data: T) {
    localStorage.setItem(key, Tools.encrypt(JSON.stringify(data)));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
