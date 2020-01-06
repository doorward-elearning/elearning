import { Enum } from '../types';
import moment from 'moment';
import colors from './colors';
import { DropResult } from 'react-beautiful-dnd';

const SimpleCrypto = require('simple-crypto-js').default;
const parser = require('fast-xml-parser');

const process = {
  env: {
    NODE_ENV: 'development',
    REACT_APP_ENCRYPTION_SECRET: 'secret'
  }
};

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
  static findMatches(
    regex: RegExp,
    str: string,
    matches: Array<RegExpExecArray> = []
  ): Array<RegExpExecArray> {
    const res = regex.exec(str);
    res && matches.push(res) && Tools.findMatches(regex, str, matches);
    return matches;
  }

  static createRoute(path: string, params: { [name: string]: any }): string {
    const regexp = new RegExp('(:)([a-zA-z]+)', 'g');
    const matches = Tools.findMatches(regexp, path);

    return matches.reduce((acc: string, cur: RegExpExecArray): string => {
      return acc.replace(cur[0], params[cur[2]] || cur[0]);
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

  static truncate<T>(data: Array<T> = [], length: number): Array<T> {
    return data.filter((_, index) => index < length);
  }

  static hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const character = str.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  static color(str: string): string {
    const allColors = Object.values(colors);
    return allColors[Math.abs(Tools.hashCode(str)) % allColors.length];
  }

  static shortDate(str: string): string {
    return moment(str).format('DD/MM/YYYY');
  }

  static normalDate(str: string): string {
    return moment(str).format('Do MMMM YYYY');
  }

  static longDate(str: string): string {
    return moment(str).format('dddd, MMMM Do YYYY');
  }
  static shortDateTime(str: string): string {
    return moment(str).format('DD/MM/YYYY hh:mm a');
  }

  static normalDateTime(str: string): string {
    return moment(str).format('Do MMMM YYYY hh:mm a');
  }

  static longDateTime(str: string): string {
    return moment(str).format('dddd, MMMM Do YYYY at hh:mm a');
  }

  static handleReorder<T>(
    items: Array<T>,
    key: keyof T,
    dropResult: DropResult
  ): Array<T> {
    const { destination, source, draggableId } = dropResult;
    let newItems = items;
    if (destination) {
      newItems = newItems.filter(
        (item: T) => item[key] !== (draggableId as any)
      );
      newItems.splice(destination.index, 0, items[source.index]);
    }
    return newItems;
  }

  static randomInt(from: number, to: number): number {
    return Math.floor(from + Math.random() * (to - from));
  }
}

export default Tools;
