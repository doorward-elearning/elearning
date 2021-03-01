import { RouteNames, Routes } from '@doorward/ui/types';
import { ReactNode } from 'react';
import { match } from 'react-router';
import { Location, MemoryHistory } from 'history';
import { FormikActions } from 'formik';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
  match: match;
}

type OnFormSubmit<T> = (values: T, actions: FormikActions<T>) => void;

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;
