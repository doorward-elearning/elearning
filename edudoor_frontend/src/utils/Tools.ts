import { Enum } from '../types';
const SimpleCrypto = require('simple-crypto-js').default;
const parser = require('fast-xml-parser');

const simpleCrypto = new SimpleCrypto(process.env.REACT_APP_ENCRYPTION_SECRET);

class Tools {
  static AUTHORIZATION_TOKEN = 'token';

  static enumKeys<T extends Enum<S>, S>(enumeration: T): Array<T> {
    const keys: any[] = Object.keys(enumeration);
    return keys
      .map(k => enumeration[k])
      .filter(x => typeof x !== 'string')
      .map((x: any) => x as T);
  }

  static randomString(length = 6): string {
    return `${Math.random()}`.substr(2, length);
  }

  static generateToken(username: string, password: string): string {
    return btoa(username + ':' + password);
  }

  static setToken(token: string): void {
    sessionStorage.setItem(Tools.AUTHORIZATION_TOKEN, Tools.encrypt(token));
  }

  static encrypt(str: string | null): string {
    return str ? simpleCrypto.encrypt(str) : '';
  }

  static decrypt(str: string | null): string {
    return str ? simpleCrypto.decrypt(str) : '';
  }

  static clearToken(): void {
    sessionStorage.removeItem(Tools.AUTHORIZATION_TOKEN);
  }

  static getToken(): string | null {
    return Tools.decrypt(sessionStorage.getItem(Tools.AUTHORIZATION_TOKEN));
  }

  static isLoggedIn(): boolean {
    return !!Tools.getToken();
  }

  static xmlToJson(xml: string, options?: object): object {
    const tObj = parser.getTraversalObj(xml, options);
    return parser.convertToJson(tObj, options);
  }
  static findMatches(regex: RegExp, str: string, matches: Array<RegExpExecArray> = []): Array<RegExpExecArray> {
    const res = regex.exec(str);
    res && matches.push(res) && Tools.findMatches(regex, str, matches);
    return matches;
  }

  static createRoute(path: string, params: { [name: string]: any }): string {
    const regexp = new RegExp('(:)([a-zA-z]+)', 'g');
    const matches = Tools.findMatches(regexp, path);

    return matches.reduce((acc: string, cur: RegExpExecArray): string => {
      return acc.replace(cur[0], params[cur[2]]);
    }, path);
  }

  static str(value: any): string {
    return value ? value + '' : '--';
  }

  static pick<T, K extends keyof T>(source: T, keys: K[]): Pick<T, K> {
    const returnValue = {} as Pick<T, K>;
    keys.forEach(k => {
      returnValue[k] = source[k];
    });
    return returnValue;
  }
}

export default Tools;
