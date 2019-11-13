import { MemoryHistory, Location } from 'history';
import { ReactNode } from 'react';
import { match, Route, RouteComponentProps } from 'react-router';
import * as React from 'react';
import { BreadCrumb } from '../components/ui/BreadCrumbs';
import { EdudoorRoute, routes } from '../routes';
import { FormikActions } from 'formik';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
  match: match;
}

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;

export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export type Routes = { [key in keyof typeof routes]?: EdudoorRoute };

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RouteDefinition = {
  tree: Array<keyof typeof routes>;
  id: keyof typeof routes;
  matchURL: string;
  withParams: (params: { [name: string]: any }) => string;
} & BreadCrumb;

export type RouteDefinitions = {
  [key in keyof typeof routes]: RouteDefinition;
};

export type RouteIds = {
  [key in keyof typeof routes]: keyof typeof routes;
};

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

type RouteBuilder = {
  link: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  authenticated: boolean;
  routes?: Routes;
};

type OnFormSubmit<T> = (values: T, actions: FormikActions<T>) => void;
