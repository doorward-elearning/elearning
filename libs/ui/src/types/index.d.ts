import { Location, MemoryHistory } from 'history';
import * as React from 'react';
import { ReactNode } from 'react';
import { match, RouteComponentProps } from 'react-router';
import { BreadCrumb } from '../components/BreadCrumbs';
import { FormikActions } from 'formik';
import { MRoute } from '../routes/MRoute';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
  match: match;
}

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;

export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export interface RouteNames {
  [name: string]: string;
}

export type Routes<T extends RouteNames> = { [name in keyof T]?: MRoute<T> };

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RouteDefinition<T> = {
  tree: Array<keyof T>;
  id: keyof T;
  matchURL: string;
  withParams: (params: { [name: string]: any }) => string;
} & BreadCrumb;

export type RouteDefinitions<T extends RouteNames> = {
  [key in keyof T]: RouteDefinition<T>;
};

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

type RouteBuilder = {
  link: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  authenticated: boolean;
  routes?: Routes;
};

type OnFormSubmit<T> = (values: T, actions: FormikActions<T>) => void;

export type VoidFunction = () => void;

export type Value<T, K = keyof T> = K;
