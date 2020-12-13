import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  Action,
  ApiSagaMiddleware,
  BuiltReducer,
  ReducerBuilder,
  ReducerMiddleware,
  ReduxReducerApiActionProps,
  SagaFunction,
  StaticReducer,
  WebComponentState,
} from './reducers';
import chainReducers from './chain';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import objectHash from 'object-hash';
import { ApiCall } from '../services/services';
import toast from '../utils/toast';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import handleApiError from '@doorward/common/net/handleApiError';

export const webComponentState: WebComponentState<any> = {
  action: '',
  fetched: false,
  fetching: false,
  submitted: false,
  submitting: false,
  data: {},
  errors: {},
  failed: false,
};

function simpleReducer<T extends WebComponentState<any>>(initialState: T, actionType: string): Reducer<T, Action> {
  return (state: T = initialState, action: Action): T => {
    if (action.type === actionType) {
      // avoid hashing pagination
      const hashValue = { ...action };

      const hash = objectHash(hashValue);

      return {
        ...state,
        action: hash,
        fetched: false,
        fetching: true,
        submitted: false,
        submitting: true,
        data: hash === state.action ? state.data : {},
        errors: {},
        failed: false,
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
        failed: false,
      };
    } else if (action.type === `${actionType}_FAILURE`) {
      return {
        ...state,
        fetched: false,
        fetching: false,
        submitted: true,
        submitting: false,
        errors: {
          statusCode: action.statusCode,
          ...action.payload,
        },
        failed: true,
      };
    } else if (action.type === `${actionType}_CLEAR`) {
      return initialState;
    } else {
      return state;
    }
  };
}

function createReducer<T extends WebComponentState<any>>(
  initialState: T,
  actionType: string,
  reducer?: Reducer<T, Action>
): Reducer<T, Action> {
  const reducers = [simpleReducer(initialState, actionType)];
  if (reducer) {
    reducers.push(reducer);
  }
  return chainReducers<T>(initialState)(...reducers);
}

function createMiddleware<T extends DApiResponse = DApiResponse>(
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

        if (action.showSuccessToast) {
          const d = data as DApiResponse;
          if (d.message) {
            toast.show({
              message: d.message,
              type: 'success',
              timeout: 3000,
              hPosition: 'center',
              vPosition: 'top',
            });
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
      const data = handleApiError(error);

      if (action.showErrorToast) {
        const d = data as DApiResponse;
        if (d.message && !d.errors) {
          toast.show({
            message: d.message,
            type: 'error',
            timeout: 3000,
            hPosition: 'center',
            vPosition: 'top',
          });
        }
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
        statusCode: error?.response?.status,
      });
    }
  }

  function* watchForAction(): IterableIterator<any> {
    yield takeLatest(actionType, makeApiCall);
  }

  return watchForAction;
}

export function modifyReducer<T extends object>(
  location: string,
  state: T,
  action: Action,
  resolveValue: (current: any) => any
): T {
  const resolvedLocation = location;
  if (resolvedLocation) {
    const stateValue = _.get(state, resolvedLocation);
    const newState = { ...state };
    if (stateValue) {
      _.set(newState, resolvedLocation, resolveValue(stateValue));
    }
    return newState;
  }
  return state;
}

export function reducerApiAction<T extends DApiResponse>(args: {
  action: string;
  api: ApiCall<T>;
  apiMiddleware?: ApiSagaMiddleware<T>;
  reducer?: StaticReducer<WebComponentState<T>, Action>;
}): ReduxReducerApiActionProps<WebComponentState<T>, T> {
  return args;
}

type Unpack<T> = WebComponentState<T extends ReduxReducerApiActionProps<any, any> & { api: ApiCall<infer U> } ? U : T>;

export type BuiltState<T> = {
  [K in keyof T]: Unpack<T[K]>;
};

export default function reducerBuilder<T extends WebComponentState<any>, R extends ReducerMiddleware>({
  initialState = webComponentState,
  middleware,
  reducers: stateModifiers,
}: ReducerBuilder<BuiltState<R>, R>): BuiltReducer<BuiltState<R>> {
  const reducers: ReducersMapObject = {};

  const watchers: Array<SagaFunction> = [];

  (Object.keys(middleware) as Array<keyof typeof middleware>).forEach((mName) => {
    const m = middleware[mName];
    reducers[mName] = createReducer<T>(initialState, m.action, m.reducer);
    const watcher = createMiddleware(m.action, m.api, m.apiMiddleware);
    watchers.push(watcher);
  });

  let createdReducer = combineReducers(reducers);
  if (stateModifiers) {
    createdReducer = chainReducers(initialState)(createdReducer, ...stateModifiers);
  }
  return {
    reducer: createdReducer,
    watchers,
  };
}
