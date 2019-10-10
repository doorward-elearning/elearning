import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import login from '../reducers/login';

export function* rootSaga(): IterableIterator<any> {
  yield all([login.watcher()]);
}

const state = {
  login: login.reducer,
};

export const rootReducer = combineReducers<any>(state);
