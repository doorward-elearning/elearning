import { MemoryHistory, Location } from 'history';
import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import { EdudoorRoutes } from '../routes/routes';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
}

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;

export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export type Routes = { [key in keyof EdudoorRoutes]?: RouteBuilder };

export type RouteDefinitions = {
  [key in keyof EdudoorRoutes]: {
    name: string;
    link: string;
  };
};

type RouteBuilder = {
  link: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  authenticated: boolean;
  routes?: Routes;
};
