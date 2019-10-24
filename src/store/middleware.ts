import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { BuiltReducer } from '../reducers/reducers';
import { ReducerMapObject } from './store';

import login from '../reducers/login';
import courses from '../reducers/courses';

const sagas: IterableIterator<any>[] = [];
const state: ReducerMapObject<any, any> = {};

const build = (reducers: BuiltReducer[]): void => {
  reducers.forEach(reducer => {
    reducer.watchers.forEach(watcher => {
      sagas.push(watcher());
    });
    state[reducer.name] = reducer.reducer;
  });
};

build([login, courses]);

export function* rootSaga(): IterableIterator<any> {
  yield all([...sagas]);
}

export const rootReducer = combineReducers<any>(state);
