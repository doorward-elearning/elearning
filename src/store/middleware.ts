import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import login from '../reducers/login';
import { BuiltReducer } from '../reducers/reducers';
import { ReducerMapObject } from './store';

const sagas: IterableIterator<any>[] = [];
const state: ReducerMapObject<any, any> = {};

const build = (reducers: BuiltReducer[]) => {
  reducers.forEach(reducer => {
    sagas.push(reducer.watcher());
    state[reducer.name] = reducer.reducer;
  });
};

build([login]);

export function* rootSaga(): IterableIterator<any> {
  yield all([...sagas]);
}

export const rootReducer = combineReducers<any>(state);
