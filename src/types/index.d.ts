import { MemoryHistory, Location } from 'history';
import { ReactNode } from 'react';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
}

export type HigherOrderComponent<T, S extends ReactNode> = (props: T) => (S) => ReactNode;
