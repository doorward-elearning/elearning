import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  Action,
  ApiSagaMiddleware,
  BuiltReducer,
  ReducerBuilder,
  ReduxReducerApiAction,
  SagaFunction,
  StoreLocationResolver,
  WebComponentState,
} from './reducers';
import { ApiCall, ApiResponse } from '../services/services';
import chainReducers from './chain';
import { AxiosResponse } from 'axios';
import _ from 'lodash';

export const webComponentState: WebComponentState<any> = {
  fetched: false,
  fetching: false,
  submitted: false,
  submitting: false,
  data: {},
  errors: {},
};

function simpleReducer<T>(initialState: T, actionType: string): Reducer<T, Action> {
  return (state: T = initialState, action: Action): T => {
    if (action.type === actionType) {
      return {
        ...state,
        fetched: false,
        fetching: true,
        submitted: false,
        submitting: true,
        errors: {},
      };
    } else if (action.type === `${actionType}_SUCCESS`) {
      return {
        ...state,
        fetched: true,
        fetching: false,
        submitted: true,
        submitting: false,
        data: action.payload || {},
        errors: {},
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

function createReducer<T>(initialState: T, actionType: string, reducer?: Reducer<T, Action>): Reducer<T, Action> {
  const reducers = [simpleReducer(initialState, actionType)];
  if (reducer) {
    reducers.push(reducer);
  }
  return chainReducers<T>(initialState)(...reducers);
}

function createMiddleware<T extends ApiResponse = ApiResponse>(
  actionType: string,
  endpoint: ApiCall<T>,
  middleware?: ApiSagaMiddleware<T>
): SagaFunction {
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
      const response: AxiosResponse<T> | undefined = yield call(endpoint, ...args);
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
      let data: ApiResponse;
      if (error.response) {
        data = error.response.data;
      } else {
        data = {
          success: false,
          message: 'Server facing technical issue. Please try again!',
        };
      }
      if (middleware && middleware.error) {
        yield middleware.error(data);
      }
      if (action.onError) {
        action.onError(data, args);
      }
      yield put({
        type: `${actionType}_FAILURE`,
        payload: data,
      });
    }
  }

  function* watchForAction(): IterableIterator<any> {
    yield takeLatest(actionType, makeApiCall);
  }

  return watchForAction;
}

export function modifyReducer<T extends object>(
  location: string | StoreLocationResolver<T>,
  actionType: string,
  reducer: Reducer
) {
  return (state: T, action: Action): T => {
    if (action.type === actionType) {
      let resolvedLocation;
      if (location as StoreLocationResolver<T>) {
        resolvedLocation = (location as StoreLocationResolver<T>)(state, action);
      } else if (location as string) {
        resolvedLocation = location as string;
      }
      if (resolvedLocation) {
        const stateValue = _.get(state, resolvedLocation);
        const newState = { ...state };
        if (stateValue) {
          const newValue = reducer(stateValue, action);
          _.set(newState, resolvedLocation, newValue);
        }
        return newState;
      }
    }
    return state;
  };
}

export default function reducerBuilder<T = WebComponentState<any>>({
  initialState = webComponentState,
  name,
  middleware,
  reducers: stateModifiers,
}: ReducerBuilder<T>): BuiltReducer<T> {
  const reducers: ReducersMapObject = {};

  const watchers: Array<SagaFunction> = [];

  middleware.forEach(m => {
    if ((m as ReduxReducerApiAction<any, T>).key) {
      const rm = m as ReduxReducerApiAction<any, T>;

      reducers[rm.key] = createReducer<T>(initialState, m.action, rm.reducer as Reducer<T, Action>);
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

  let createdReducer = oneReducer ? reducersList[0] : combineReducers(reducers);
  if (stateModifiers) {
    createdReducer = chainReducers(initialState)(createdReducer, ...stateModifiers);
  }
  return {
    reducer: createdReducer,
    watchers,
    name,
  };
}
