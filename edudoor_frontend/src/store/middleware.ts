import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { BuiltReducer } from '../reducers/reducers';
import { ReducerMapObject } from './store';

import login from '../reducers/login';
import courses from '../reducers/courses';

const sagas: IterableIterator<any>[] = [];

function build<T, K extends keyof T>(...reducers: Array<BuiltReducer<any>>): ReducerMapObject<T[K], any> {
  const state: any = {};
  reducers.forEach(reducer => {
    reducer.watchers.forEach(watcher => {
      sagas.push(watcher());
    });
    state[reducer.name] = reducer.reducer;
  });
  return state as ReducerMapObject<T[K], any>;
}

const state = build(login, courses);

export function* rootSaga(): IterableIterator<any> {
  yield all([...sagas]);
}

export const rootReducer = combineReducers<any>(state);
