import { applyMiddleware, CombinedState, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import build, { GeneratedReducers, ReducerObject } from '@edudoor/ui/store/middleware';

export default function<T extends ReducerObject>(reducers: T): Store<CombinedState<GeneratedReducers<T>>> {
  const sagaMiddleware = createSagaMiddleware();

  const { rootReducer, rootSaga } = build(reducers);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(rootReducer, middleware);

  sagaMiddleware.run(rootSaga);

  return store;
}
