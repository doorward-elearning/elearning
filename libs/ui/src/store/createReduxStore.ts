import { applyMiddleware, CombinedState, combineReducers, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import build, { GeneratedReducers, ReducerObject } from '@doorward/ui/store/middleware';

export default function <T extends ReducerObject, R extends Record<string, ReducerObject>>(
  reducers: T,
  collections?: R
): Store<CombinedState<GeneratedReducers<T, R>>> {
  const sagaMiddleware = createSagaMiddleware();
  const { state: allStates, sagas: allSagas }: any = build(reducers);

  if (collections) {
    Object.keys(collections).forEach((collection) => {
      const { state, sagas } = build(collections[collection]);

      allStates[collection] = combineReducers(state);
      allSagas.push(...sagas);
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(combineReducers(allStates), middleware);

  sagaMiddleware.run(function* () {
    yield all([...allSagas]);
  });

  return store as any;
}
