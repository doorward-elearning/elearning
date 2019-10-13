import { ApiCall } from '../types';
import { Action as ReduxAction, Reducer } from 'redux';

export type SagaFunction = () => IterableIterator<any>;

export type ApiListener = (response: any, request: any) => void;

export interface Action extends ReduxAction {
  payload?: any;
  onSuccess?: ApiListener;
  onError?: ApiListener;
}

export type ActionCreatorArgs = {
  type: string;
  onSuccess?: ApiListener;
  onError?: ApiListener;
};

export type ActionCreator = (...args: any[]) => Action;

export type ActionCreatorGenerator = (args: ActionCreatorArgs) => ActionCreator;

export type ActionsMap = {
  [name: string]: ActionCreator;
};

export type StoreActionMap<T extends ActionsMap> = {
  [K in keyof T]: ActionCreator;
};

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
  after?: (request: any, response: any) => void | IterableIterator<any>;
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
