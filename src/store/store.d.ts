import { WebComponentState } from '../types';
import { Action } from '../reducers/reducers';
import { Reducer } from 'react';

export type State = {
  login: WebComponentState;
};

export type ReducerMapObject<S = any, A extends Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};
