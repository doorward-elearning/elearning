import { all } from 'redux-saga/effects';
import { CombinedState, combineReducers, Reducer, ReducersMapObject } from 'redux';
import { BuiltReducer } from '../reducers/reducers';

type Unpack<T> = T extends BuiltReducer<infer U> ? U : T;

export type ReducerObject = {
  [name: string]: BuiltReducer<any> | Reducer;
};

export type GeneratedReducers<T> = {
  [S in keyof T]: Unpack<T[S]>;
};

export default function build<T extends ReducerObject, K extends keyof T>(
  reducers: T
): {
  rootReducer: Reducer<CombinedState<GeneratedReducers<T>>>;
  rootSaga: () => IterableIterator<any>;
} {
  const state: any = {};
  const sagas: IterableIterator<any>[] = [];
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
  return {
    rootReducer: combineReducers(state as ReducersMapObject<GeneratedReducers<T>, any>),
    rootSaga: function*() {
      yield all([...sagas]);
    },
  };
}
