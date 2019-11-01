import { all } from 'redux-saga/effects';
import { combineReducers, ReducersMapObject } from 'redux';
import { BuiltReducer } from '../reducers/reducers';

import login from '../reducers/login';
import courses from '../reducers/courses';

const sagas: IterableIterator<any>[] = [];

type Unpack<T> = T extends BuiltReducer<infer U> ? U : T;

type ReducerObject = {
  [name: string]: BuiltReducer<any>;
};

type GeneratedReducers<T> = {
  [S in keyof T]: Unpack<T[S]>;
};

function build<T extends ReducerObject, K extends keyof T>(reducers: T): ReducersMapObject<GeneratedReducers<T>, any> {
  const state: any = {};
  (Object.keys(reducers) as Array<keyof typeof reducers>).forEach(reducerName => {
    const reducer = reducers[reducerName];
    reducer.watchers.forEach(watcher => {
      sagas.push(watcher());
    });
    state[reducerName] = reducer.reducer;
  });
  return state as ReducersMapObject<GeneratedReducers<T>, any>;
}

const reducers = {
  login,
  courses,
};
const state = build(reducers);

export function* rootSaga(): IterableIterator<any> {
  yield all([...sagas]);
}

export const rootReducer = combineReducers(state);
