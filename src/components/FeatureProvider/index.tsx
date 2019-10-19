import React, { createContext, PropsWithChildren } from 'react';
import { Enum } from '../../types';

export const FeatureContext = createContext<{ features: Array<any> }>({ features: [] });

function FeatureProvider<T>(props: FeatureProviderProps<T>): JSX.Element {
  return <FeatureContext.Provider value={{ features: props.features }}>{props.children}</FeatureContext.Provider>;
}

export interface FeatureProviderProps<T> extends PropsWithChildren<any> {
  features: Array<T>;
}

export type Features<T extends Enum<S>, S> = Array<T | string | S>;

export default FeatureProvider;
