import { Enum } from '@doorward/common/types';
import moment, { Moment } from 'moment';
import { capitalize } from 'lodash';
import colors from '@doorward/ui/colors/colors';
import { DropResult } from 'react-beautiful-dnd';
import ago, { Units } from '@doorward/common/utils/ago';

const SimpleCrypto = require('simple-crypto-js').default;
const parser = require('fast-xml-parser');
const shortId = require('shortid');
const randomString = require('random-string');

const simpleCrypto = new SimpleCrypto(process.env.ENCRYPTION_SECRET || '');

class Tools {
  static AUTHORIZATION_TOKEN = 'jwtToken';

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

  static encrypt(str: string | null): string {
    return str ? simpleCrypto.encrypt(str) : '';
  }

  static setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + (value || '') + expires;
  }

  static getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static eraseCookie(name) {
    document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  static decrypt(str: string | null): string {
    return str ? simpleCrypto.decrypt(str) : '';
  }

  static setToken(token: string): void {
    Tools.setCookie(Tools.AUTHORIZATION_TOKEN, token, +(process.env.JWT_EXPIRY_TIME.replace('d', '') || '30'));
  }

  static clearToken(): void {
    Tools.eraseCookie(Tools.AUTHORIZATION_TOKEN);
  }

  static getToken(): string | null {
    return this.getCookie(Tools.AUTHORIZATION_TOKEN);
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

  static humanReadableTime(date: Date | string | Moment, maxUnit: Units) {
    return capitalize(ago(moment(date).toDate(), maxUnit));
  }

  static htmlToElement(html: string) {
    const template = document.createElement('template');
    if (html) {
      html = html.trim(); // Never return a text node of whitespace as the result
      template.innerHTML = html;
      return template.content.firstChild;
    }
  }

  static getParentElement(el: HTMLElement | ChildNode) {
    while (el.parentElement) {
      if (el.parentElement.tagName !== 'BODY') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        el = el.parentNode;
      }
      if (el.parentElement.tagName === 'BODY') {
        return el;
      }
    }
  }
  static replaceElement(newElement: Element | ChildNode, oldElement: HTMLElement | ChildNode) {
    if (!(newElement instanceof HTMLElement)) {
      return;
    }

    const parentNode = oldElement.parentNode;
    return parentNode.replaceChild(newElement, oldElement);
  }
}

export default Tools;
