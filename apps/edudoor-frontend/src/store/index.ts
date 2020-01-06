import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import build from '@edudoor/ui/store/middleware';

const sagaMiddleware = createSagaMiddleware();

const { rootReducer, rootSaga } = build(reducers);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, middleware);
const state = store.getState();

export type State = typeof state;

sagaMiddleware.run(rootSaga);

export default store;