import { Reducer } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  Action,
  ActionCreatorGenerator,
  ApiSagaMiddleware,
  BuiltReducer,
  ReducerBuilder,
  SagaFunction,
  WebComponentState,
} from './reducers';
import { ApiCall } from '../services/services';
import chainReducers from './chain';

export const action: ActionCreatorGenerator = ({ type, onSuccess, onError }) => {
  return (...data: any[]): Action => ({ type, payload: data, onError, onSuccess });
};

export const webComponentState: WebComponentState = {
  fetched: false,
  fetching: false,
  submitted: false,
  submitting: false,
  data: null,
  errors: null,
};

function simpleReducer<T extends WebComponentState>(actionType: string): Reducer {
  return (state: T, action: Action): T => {
    switch (action.type) {
    case actionType:
      return {
        ...state,
        fetched: false,
        fetching: true,
        submitted: false,
        submitting: true,
        errors: null,
      };
    case `${actionType}_SUCCESS`:
      return {
        ...state,
        fetched: true,
        fetching: false,
        submitted: true,
        submitting: false,
        data: action.payload,
        errors: null,
      };
    case `${actionType}_FAILURE`:
      return {
        ...state,
        fetched: false,
        fetching: false,
        submitted: true,
        submitting: false,
        errors: action.payload,
      };
    default:
      return state;
    }
  };
}

function createReducer<T extends WebComponentState>(
  initialState: T | WebComponentState,
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

export default function reducerBuilder<T extends WebComponentState = WebComponentState>({
  actionType,
  reducer,
  initialState = webComponentState,
  endpoint,
  name,
  apiMiddleware,
}: ReducerBuilder<T>): BuiltReducer {
  const combinedReducer = createReducer<T>(initialState, actionType, reducer);
  const watcher = createMiddleware(actionType, endpoint, apiMiddleware);

  return {
    reducer: combinedReducer,
    watcher,
    name,
  };
}
