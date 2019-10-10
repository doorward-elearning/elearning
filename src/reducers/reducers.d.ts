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
  data?: object | null;
  errors: any;
};

export type ReducerBuilder<T extends WebComponentState> = {
  actionType: string;
  endpoint: ApiCall;
  initialState?: T | WebComponentState;
  name: string;
};

export type BuiltReducer = {
  reducer: Reducer;
  watcher: SagaFunction;
  name: string;
};
