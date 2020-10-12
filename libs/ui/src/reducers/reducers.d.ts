import { Action as ReduxAction, AnyAction, Reducer } from 'redux';
import { ApiCall, ApiError } from '../services/services';
import { PaginatedResponse, PaginationMetaData } from '@doorward/common/dtos/response/base.response';

export type SagaFunction = () => IterableIterator<any>;

export type ApiListener = (response: any, request: any) => void;

export interface Action<T extends any = any> extends ReduxAction {
  payload?: T;
  onSuccess?: ApiListener;
  onError?: ApiListener;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  statusCode?: number;
}

export type ActionCreator<T = any[]> = (...args: T) => Action;

export interface WebComponentState<T> {
  action: string;
  fetching: boolean;
  fetched: boolean;
  submitting: boolean;
  submitted: boolean;
  data: T;
  errors: ApiError;
  failed: boolean;
}

export interface ApiSagaMiddleware<T extends ApiResponse> {
  before?: (...args: Array<any>) => Array<any>;
  after?: (request: any, response: T) => void | IterableIterator<any>;
  error?: (error: ApiResponse) => void | IterableIterator<any>;
}

export type ReducerMiddleware = {
  [name: string]: ReduxReducerApiActionProps;
};

export type ReducerBuilder<T, R> = {
  initialState?: WebComponentState;
  reducers?: Array<StaticReducer<T, Action>>;
  middleware: R;
};

export interface ReduxApiActionProps<T> {
  action: string;
  api: ApiCall<T>;
  apiMiddleware?: ApiSagaMiddleware<T>;
}

export type StaticReducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;

export interface ReduxReducerApiActionProps<R = WebComponentState<any>, T> extends ReduxApiActionProps<T> {
  reducer?: StaticReducer<R, Action>;
}

export type BuiltReducer<T> = {
  reducer: Reducer<T, Action>;
  watchers: Array<SagaFunction>;
};
