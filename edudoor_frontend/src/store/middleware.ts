import { all } from 'redux-saga/effects';
import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { BuiltReducer } from '../reducers/reducers';
import reducers from './reducers';

const sagas: IterableIterator<any>[] = [];

type Unpack<T> = T extends BuiltReducer<infer U> ? U : T;

type ReducerObject = {
  [name: string]: BuiltReducer<any> | Reducer;
};

type GeneratedReducers<T> = {
  [S in keyof T]: Unpack<T[S]>;
};

function build<T extends ReducerObject, K extends keyof T>(reducers: T): ReducersMapObject<GeneratedReducers<T>, any> {
  const state: any = {};
  (Object.keys(reducers) as Array<keyof typeof reducers>).forEach(reducerName => {
    const _reducer = reducers[reducerName];
    if ((_reducer as BuiltReducer<any>).watchers) {
      const reducer = _reducer as BuiltReducer<any>;
      reducer.watchers.forEach(watcher => {
        sagas.push(watcher());
      });
      state[reducerName] = reducer.reducer;
    } else {
      state[reducerName] = _reducer;
    }
  });
  return state as ReducersMapObject<GeneratedReducers<T>, any>;
}

const state = build(reducers);

export function* rootSaga(): IterableIterator<any> {
  yield all([...sagas]);
}

export const rootReducer = combineReducers(state);
