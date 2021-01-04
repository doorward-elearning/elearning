import i18next, { StringMap, TFunctionResult, TOptions } from 'i18next';
import defaultLang from '../../../../locales/en/en.default.json';

type TKeys = keyof typeof defaultLang;

export interface TFunction {
  // basic usage
  <TResult extends TFunctionResult = string, TInterpolationMap extends object = StringMap>(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string
  ): TResult;
  // overloaded usage
  <TResult extends TFunctionResult = string, TInterpolationMap extends object = StringMap>(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string
  ): TResult;
}

const translate: TFunction = i18next
  ? i18next.t.bind(i18next)
  : require('i18next').t.bind(require('i18next'));

export default translate;
