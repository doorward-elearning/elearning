import { ApiCall } from '../types';
import { Action as ReduxAction, AnyAction, Reducer } from 'redux';

export type SagaFunction = () => IterableIterator<any>;

export interface Action extends ReduxAction {
  payload?: any;
}

export type ActionCreator = (...args: any[]) => AnyAction;

export type WebComponentState = {
  fetching: boolean;
  fetched: boolean;
  submitting: boolean;
  submitted: boolean;
  data: object | null | undefined;
  errors: any;
};

export interface ApiSagaMiddleware {
  before?: (...args: Array<any>) => Array<any>;
  after?: (data: any) => void | IterableIterator<any>;
  error?: (error: { status: number; payload: any }) => void | IterableIterator<any>;
}

export type ReducerBuilder<T extends WebComponentState> = {
  actionType: string;
  endpoint: ApiCall;
  initialState?: T | WebComponentState;
  name: string;
  reducer?: Reducer;
  apiMiddleware?: ApiSagaMiddleware;
};

export type BuiltReducer = {
  reducer: Reducer;
  watcher: SagaFunction;
  name: string;
};
