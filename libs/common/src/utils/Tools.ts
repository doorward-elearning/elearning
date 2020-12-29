import { Enum } from '@doorward/common/types';
import moment from 'moment';
import { capitalize } from 'lodash';
import ago from 's-ago';
import colors from '@doorward/ui/colors/colors';
import { DropResult } from 'react-beautiful-dnd';

const SimpleCrypto = require('simple-crypto-js').default;
const parser = require('fast-xml-parser');
const shortId = require('shortid');
const randomString = require('random-string');

const simpleCrypto = new SimpleCrypto(process.env.ENCRYPTION_SECRET || '');

class Tools {
  static AUTHORIZATION_TOKEN = 'token';

  static enumKeys<T extends Enum<S>, S>(enumeration: T): Array<T> {
    const keys: any[] = Object.keys(enumeration);
    return keys
      .map((k) => enumeration[k])
      .filter((x) => typeof x !== 'string')
      .map((x: any) => x as T);
  }

  static generateId(): string {
    return Array(2)
      .fill(0)
      .map(() => Tools.randomString(6))
      .join('');
  }

  static randomString(length = 6): string {
    return randomString({
      length,
      numeric: true,
      letters: true,
    });
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
      return acc.replace(cur[0], params[cur[2]] || cur[0]);
    }, path);
  }

  static str(value: any): string {
    return value || value === 0 ? value + '' : '--';
  }

  static pick<T, K extends keyof T>(source: T, keys: K[]): Pick<T, K> {
    const returnValue = {} as Pick<T, K>;
    keys.forEach((k) => {
      returnValue[k] = source[k];
    });
    return returnValue;
  }

  static truncate<T>(data: Array<T> = [], length: number): Array<T> {
    return data.filter((_, index) => index < length);
  }

  static hashCode(str: string): number {
    str = str || '';
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

  static shortDate(str: string | Date): string {
    return str ? moment(str).format('DD/MM/YYYY') : '--';
  }

  static normalDate(str: string | Date): string {
    return str ? moment(str).format('Do MMMM YYYY') : '--';
  }

  static longDate(str: string | Date): string {
    return str ? moment(str).format('dddd, MMMM Do YYYY') : '--';
  }
  static shortDateTime(str: string | Date): string {
    return str ? moment(str).format('DD/MM/YYYY hh:mm a') : '--';
  }

  static normalDateTime(str: string | Date): string {
    return str ? moment(str).format('Do MMMM YYYY hh:mm a') : '--';
  }

  static longDateTime(str: string | Date): string {
    return str ? moment(str).format('dddd, MMMM Do YYYY at hh:mm a') : '--';
  }

  static normalTime(str: string | Date): string {
    return str ? moment(str).format('hh:mm a') : '--';
  }

  static handleReorder<T>(items: Array<T>, key: keyof T, dropResult: DropResult): Array<T> {
    const { destination, source, draggableId } = dropResult;
    let newItems = items;
    if (destination) {
      newItems = newItems.filter((item: T) => item[key] !== (draggableId as any));
      newItems.splice(destination.index, 0, items[source.index]);
    }
    return newItems;
  }

  static randomInt(from: number, to: number): number {
    return Math.floor(from + Math.random() * (to - from));
  }

  static fileSize(bytes: number) {
    if (!bytes) {
      return '';
    }
    if (bytes < 1024) {
      return Math.round(bytes) + ' bytes';
    } else if (bytes < 1024 * 1024) {
      return Math.round(bytes / 1024) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
      return Math.round(bytes / (1024 * 1024)) + ' MB';
    } else {
      return Math.round(bytes / (1024 * 1024 * 1024)) + ' GB';
    }
  }

  static compareFiles(first: File, second: File) {
    return first.name === second.name && first.lastModified === second.lastModified && first.size === second.size;
  }

  static generatePassword() {
    return shortId.generate();
  }

  static joinURL(...paths: Array<string>) {
    return paths.map((path) => path.replace(/^\//, '').replace(/\/$/, '')).join('/');
  }

  static humanReadableTime(date: Date) {
    return capitalize(ago(date));
  }
}

export default Tools;
