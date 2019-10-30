import { Action as ReduxAction, AnyAction, Reducer } from 'redux';
import { Dispatch } from 'react';
import { ApiCall, ApiError, ApiResponse } from '../services/services';

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
  data: T;
  errors: ApiError;
}

export interface ApiSagaMiddleware<T extends ApiResponse> {
  before?: (...args: Array<any>) => Array<any>;
  after?: (request: any, response: T) => void | IterableIterator<any>;
  error?: (error: ApiResponse) => void | IterableIterator<any>;
}

export type ReducerBuilder<R extends WebComponentState> = {
  initialState?: R | WebComponentState;
  name?: string;
  reducer?: Reducer;
  middleware: Array<ReduxReducerApiAction<any, R> | ReduxApiAction<any, R>>;
};

export interface ReduxApiAction<T extends ApiResponse> {
  action: string;
  api: ApiCall<T>;
  apiMiddleware?: ApiSagaMiddleware<T>;
}

export type StaticReducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;

export interface ReduxReducerApiAction<T extends ApiResponse, R = WebComponentState<T>> extends ReduxApiAction<T> {
  key: string;
  reducer?: StaticReducer<R, Action>;
}

export type BuiltReducer<T> = {
  reducer: Reducer<T, Action>;
  watchers: Array<SagaFunction>;
  name: string;
};
