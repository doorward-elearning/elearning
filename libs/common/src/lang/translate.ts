import i18next, { StringMap, TFunctionResult, TOptions } from 'i18next';
import defaultLang from '../../../../locales/en/en.default.json';

export interface TranslateFunction<K extends string> {
  <TResult extends TFunctionResult = K, TInterpolationMap extends object = StringMap>(
    options?: TOptions<TInterpolationMap> | string
  ): TResult;

  // overloaded usage
  <TResult extends TFunctionResult = K, TInterpolationMap extends object = StringMap>(
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string
  ): TResult;
}

export type Translate<T extends Record<string, string>, K extends keyof T = keyof T> = Record<
  K,
  TranslateFunction<T[K]>
>;

const translate: Translate<typeof defaultLang> = Object.keys(defaultLang).reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: (defaultValue?: any, options?: any) => {
      return i18next.t(cur, defaultValue, options);
    },
  };
}, {} as any);

export default translate;
