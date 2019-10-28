import { ApiCall } from '../types';
import { Action as ReduxAction, Reducer } from 'redux';
import { Dispatch } from 'react';

export type SagaFunction = () => IterableIterator<any>;

export type ApiListener = (response: any, request: any) => void;

export interface Action extends ReduxAction {
  payload?: any;
  onSuccess?: ApiListener;
  onError?: ApiListener;
}

export type ActionCreator = (dispatch: Dispatch) => (...args: any) => Action;

export interface WebComponentState<T> {
  fetching: boolean;
  fetched: boolean;
  submitting: boolean;
  submitted: boolean;
  data: T | null;
  errors: any;
}

export interface ApiSagaMiddleware {
  before?: (...args: Array<any>) => Array<any>;
  after?: (request: any, response: any) => void | IterableIterator<any>;
  error?: (error: { status: number; payload: any }) => void | IterableIterator<any>;
}

export type ReducerBuilder<T extends WebComponentState> = {
  initialState?: T | WebComponentState;
  name?: string;
  reducer?: Reducer;
  middleware: Array<ReduxReducerApiAction | ReduxApiAction>;
};

export interface ReduxApiAction {
  action: string;
  api: ApiCall;
  apiMiddleware?: ApiSagaMiddleware;
}

export interface ReduxReducerApiAction extends ReduxApiAction {
  action: string;
  api: ApiCall;
  key: string;
  apiMiddleware?: ApiSagaMiddleware;
  reducer?: Reducer;
}

export type BuiltReducer = {
  reducer: Reducer;
  watchers: Array<SagaFunction>;
  name: string;
};
