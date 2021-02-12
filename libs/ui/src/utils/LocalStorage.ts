import Tools from '@doorward/common/utils/Tools';

export default class LocalStorage {
  static get<T>(key: string, defaultValue: T = null): T {
    try {
      return JSON.parse(Tools.decrypt(localStorage.getItem(key)));
    } catch (e) {
      return defaultValue;
    }
  }

  static set<T>(key: string, data: T) {
    localStorage.setItem(key, Tools.encrypt(JSON.stringify(data)));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
