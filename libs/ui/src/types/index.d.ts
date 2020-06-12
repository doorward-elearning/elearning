import { BreadCrumb } from '@edudoor/ui/components/BreadCrumbs';
import { RouteNames, Routes } from '@edudoor/ui/types';
import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import { MRoute } from '@edudoor/ui/routes/MRoute';
import { Location, MemoryHistory } from 'history';
import { FormikActions } from 'formik';
import { ReactNode } from 'react';

export type RouteDefinition<T> = {
  tree: Array<keyof T>;
  id: keyof T;
  matchURL: string;
  withParams: (params: { [name: string]: any }) => string;
} & BreadCrumb;

export type Routes<T extends RouteNames> = { [name in keyof T]?: MRoute<T> };

export type RouteDefinitions<T extends RouteNames> = {
  [key in keyof T]: RouteDefinition<T>;
};

export interface RouteNames {
  [name: string]: string;
}

interface RouteBuilder {
  link: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  authenticated: boolean;
  routes?: Routes;
}

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
  match: match;
}

type OnFormSubmit<T> = (values: T, actions: FormikActions<T>) => void;

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;
