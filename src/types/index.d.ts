import { MemoryHistory, Location } from 'history';
import { ReactNode } from 'react';
import { match, RouteComponentProps } from 'react-router';
import * as React from 'react';
import { BreadCrumb } from '../components/ui/BreadCrumbs';
import { routes } from '../routes';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
  match: match;
}

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;

export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export type Routes = { [key in keyof typeof routes]?: RouteBuilder };

export type RouteDefinition = {
  tree: Array<keyof typeof routes>;
  id: keyof typeof routes;
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
  hideCrumb?: boolean;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  authenticated: boolean;
  routes?: Routes;
};
