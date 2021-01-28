import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineApiReducers } from 'use-api-action';
import DoorwardApi from '../services/apis/doorward.api';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';

const apis = combineApiReducers({
  DoorwardApi,
  DoorwardChatApi,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(apis.middleware));

const store = createStore(
  combineReducers({
    apis: apis.reducer,
  }),
  middleware
);

const state = store.getState();

export type State = typeof state;

export default store;
