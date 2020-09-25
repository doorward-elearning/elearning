import { Reducer, ReducersMapObject } from 'redux';
import { BuiltReducer } from '../reducers/reducers';

type Unpack<T> = T extends BuiltReducer<infer U> ? U : T;

export type ReducerObject = {
  [name: string]: BuiltReducer<any> | Reducer;
};

export type GeneratedReducers<T, R extends Record<string, any> = any> = {
  [S in keyof T]: Unpack<T[S]>;
} &
  {
    [K in keyof R]: GeneratedReducers<R[K]>;
  };

export default function build<T extends ReducerObject, K extends keyof T>(
  reducers: T
): {
  state: ReducersMapObject<GeneratedReducers<T>, any>;
  sagas: IterableIterator<any>[];
} {
  const state: any = {};
  const sagas: IterableIterator<any>[] = [];
  (Object.keys(reducers) as Array<keyof typeof reducers>).forEach((reducerName) => {
    const _reducer = reducers[reducerName];
    if ((_reducer as BuiltReducer<any>).watchers) {
      const reducer = _reducer as BuiltReducer<any>;
      reducer.watchers.forEach((watcher) => {
        sagas.push(watcher());
      });
      state[reducerName] = reducer.reducer;
    } else {
      state[reducerName] = _reducer;
    }
  });
  return {
    state: state as ReducersMapObject<GeneratedReducers<T>, any>,
    sagas,
  };
}
