import { combineReducers, Reducer } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  Action,
  ApiSagaMiddleware,
  BuiltReducer,
  ReducerBuilder,
  ReduxReducerApiAction,
  SagaFunction,
  WebComponentState,
} from './reducers';
import { ApiCall } from '../services/services';
import chainReducers from './chain';

export const webComponentState: WebComponentState<any> = {
  fetched: false,
  fetching: false,
  submitted: false,
  submitting: false,
  data: null,
  errors: null,
};

function simpleReducer<T extends WebComponentState<R>, R>(actionType: string): Reducer {
  return (state: T, action: Action): T => {
    if (action.type === actionType) {
      return {
        ...state,
        fetched: false,
        fetching: true,
        submitted: false,
        submitting: true,
        errors: null,
      };
    } else if (action.type === `${actionType}_SUCCESS`) {
      return {
        ...state,
        fetched: true,
        fetching: false,
        submitted: true,
        submitting: false,
        data: action.payload,
        errors: null,
      };
    } else if (action.type === `${actionType}_FAILURE`) {
      return {
        ...state,
        fetched: false,
        fetching: false,
        submitted: true,
        submitting: false,
        errors: action.payload,
      };
    } else {
      return state;
    }
  };
}

function createReducer<T extends WebComponentState<R>, R>(
  initialState: T | WebComponentState<any>,
  actionType: string,
  reducer?: Reducer
): Reducer {
  const reducers = [simpleReducer(actionType)];
  if (reducer) {
    reducers.push(reducer);
  }
  return chainReducers<any>(initialState)(...reducers);
}

const createMiddleware = (actionType: string, endpoint: ApiCall, middleware?: ApiSagaMiddleware): SagaFunction => {
  function* makeApiCall(action: Action): IterableIterator<any> {
    const payload = action.payload || {};
    let args: Array<any>;
    if (payload.constructor !== Array) {
      args = [payload];
    } else {
      args = payload;
    }
    try {
      if (middleware && middleware.before) {
        args = middleware.before(args);
      }
      const response = yield call(endpoint, ...args);
      if (response) {
        let { data } = response;
        if (middleware && middleware.after) {
          const newData = yield middleware.after(args, data);
          if (newData) {
            data = newData;
          }
        }
        if (action.onSuccess) {
          action.onSuccess(data, args);
        }
        yield put({
          type: `${actionType}_SUCCESS`,
          payload: data,
        });
      }
    } catch (error) {
      const data = { status: 0, payload: null };
      if (error.response) {
        data.status = error.response.status;
        data.payload = error.response.payload;
      } else {
        data.status = 500;
      }
      if (middleware && middleware.error) {
        yield middleware.error(data);
      }
      if (action.onError) {
        action.onError(data, args);
      }
      yield put({
        type: `${actionType}_FAILURE`,
        payload: {
          ...data,
        },
      });
    }
  }

  function* watchForAction(): IterableIterator<any> {
    yield takeLatest(actionType, makeApiCall);
  }

  return watchForAction;
};

export default function reducerBuilder<T extends WebComponentState<R> = WebComponentState<any>, R = any>({
  initialState = webComponentState,
  name,
  middleware,
}: ReducerBuilder<T>): BuiltReducer {
  const reducers: { [name: string]: Reducer<any, Action> } = {};
  const watchers: Array<SagaFunction> = [];
  middleware.forEach(m => {
    if ((m as ReduxReducerApiAction).key) {
      const rm = m as ReduxReducerApiAction;
      reducers[rm.key] = createReducer<T, R>(initialState, m.action, rm.reducer);
    }
    const watcher = createMiddleware(m.action, m.api, m.apiMiddleware);
    watchers.push(watcher);
  });

  const reducersList = Object.values(reducers);
  const oneReducer = reducersList.length === 1;
  if (name) {
    if (oneReducer) {
      throw new Error('No need for a name for the root reducer if since you have one middleware');
    }
  } else {
    if (!oneReducer) {
      throw new Error('A name for the main reducer is required when you have multiple middleware');
    } else {
      name = Object.keys(reducers)[0];
    }
  }

  return {
    reducer: oneReducer ? reducersList[0] : combineReducers(reducers),
    watchers,
    name,
  };
}
