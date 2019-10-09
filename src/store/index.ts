import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootReducer} from './middleware';

const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
