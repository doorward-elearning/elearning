import { RouteDefinitions, RouteNames } from '@edudoor/ui/types';
import * as React from 'react';

export interface AppContextProps<T extends RouteNames> {
  routes: RouteDefinitions<T>;
  setTitle: (key: keyof T, name: string, link?: string) => void;
  setParams: (key: keyof T, params: { [name: string]: any }) => void;
}

function createAppContext<T extends RouteNames, S extends AppContextProps<T>>(initialValue: S) {
  return React.createContext<S>(initialValue);
}

export default createAppContext;
