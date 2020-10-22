import i18next, { StringMap, TFunctionResult, TOptions } from 'i18next';
import defaultLang from '../../locales/en/en.default.json';

export interface TranslateFunction {
  <TResult extends TFunctionResult = string, TInterpolationMap extends object = StringMap>(
    options?: TOptions<TInterpolationMap> | string
  ): TResult;

  // overloaded usage
  <TResult extends TFunctionResult = string, TInterpolationMap extends object = StringMap>(
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string
  ): TResult;
}

const translate: Record<keyof typeof defaultLang, TranslateFunction> = Object.keys(defaultLang).reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: (defaultValue?: any, options?: any) => {
      return i18next.t(cur, defaultValue, options);
    },
  };
}, {} as any);

export default translate;
