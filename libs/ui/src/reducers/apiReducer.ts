import { ArgumentTypes } from '@doorward/common/types';
import { Action, BuiltReducer, ReduxReducerApiActionProps, WebComponentState } from '@doorward/ui/reducers/reducers';
import reducerBuilder, { BuiltState, reducerApiAction } from '@doorward/ui/reducers/builder';
import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';

type ApiEndpoint<T> = (...args: any) => Promise<T>;

type ApiGroup = Record<string, ApiEndpoint<any>>;

type Api = Record<string, ApiGroup>;

type EndpointData<T> = T extends (...args: any) => Promise<infer R> ? R : unknown;

type ApiActions<A extends Api> = {
  [K in keyof A]: {
    [L in keyof A[K]]: (...args: ArgumentTypes<A[K][L]>) => Action;
  };
};

type ApiActionTypes<A extends Api> = {
  [K in keyof A]: {
    [L in keyof A[K]]: string;
  };
};

type ApiReducer<A extends Api> = {
  [K in keyof A]: BuiltReducer<
    BuiltState<
      {
        [L in keyof A[K]]: ReduxReducerApiActionProps<WebComponentState<EndpointData<A[K][L]>>, EndpointData<A[K][L]>>;
      }
    >
  >;
};

export type MiddlewareOverride<T> = Omit<
  ReduxReducerApiActionProps<WebComponentState<EndpointData<T>>, EndpointData<T>>,
  'action' | 'api'
>;

export type ApiReducerMiddleware<A extends Api> = {
  [K in keyof A]?: {
    [L in keyof A[K]]?: MiddlewareOverride<A[K][L]>;
  };
};

function apiActionCreator<T, R extends ApiEndpoint<T>, A extends Array<any> = ArgumentTypes<R>>(
  api: R,
  actionType: string
) {
  return (...args: A): Action => {
    return {
      type: actionType,
      payload: [...args],
    };
  };
}

function generateReducers<R extends Api>(
  api: R,
  name: string,
  apiReducerMiddleware?: ApiReducerMiddleware<R>
): ApiReducer<R> {
  const groupNames = Object.keys(api);

  return groupNames.reduce((acc, groupName) => {
    const middleware = generateReducer(api[groupName], name + '_' + groupName, apiReducerMiddleware?.[groupName]);
    return {
      ...acc,
      [groupName]: reducerBuilder({
        middleware,
      }),
    };
  }, {}) as any;
}

function generateReducer(
  apiGroup: Record<string, ApiEndpoint<any>>,
  prefix: string,
  middleware?: Record<string, MiddlewareOverride<any>>
) {
  const endpointNames = Object.keys(apiGroup);

  return endpointNames.reduce((acc, endpointName) => {
    acc[endpointName] = reducerApiAction({
      action: prefix + '_' + endpointName,
      api: apiGroup[endpointName],
      ...(middleware?.[endpointName] || {}),
    });
    return acc;
  }, {}) as any;
}

function generateActions<A extends typeof DoorwardBackendApi>(api: A, name: string): ApiActions<A> {
  const apiActions = {};

  const groupNames = Object.keys(api);

  groupNames.forEach((groupName) => {
    apiActions[groupName] = generateActionsForGroup(api[groupName], name + '_' + groupName);
  });

  return apiActions as ApiActions<A>;
}

function generateActionsForGroup(apiGroup: Record<string, ApiEndpoint<any>>, prefix: string) {
  const actions = {};

  const endpointNames = Object.keys(apiGroup);

  endpointNames.forEach((endpointName) => {
    actions[endpointName] = apiActionCreator(apiGroup[endpointName], prefix + '_' + endpointName);
  });

  return actions as any;
}

export function generateActionsTypes<A extends typeof DoorwardBackendApi>(api: A, name: string): ApiActionTypes<A> {
  const apiActions = {};

  const groupNames = Object.keys(api);

  groupNames.forEach((groupName) => {
    apiActions[groupName] = generateActionTypesForGroup(api[groupName], name + '_' + groupName);
  });

  return apiActions as ApiActionTypes<A>;
}

function generateActionTypesForGroup(apiGroup: Record<string, ApiEndpoint<any>>, prefix: string) {
  const actions = {};

  const endpointNames = Object.keys(apiGroup);

  endpointNames.forEach((endpointName) => {
    actions[endpointName] = prefix + '_' + endpointName;
  });

  return actions as any;
}

function buildApiReducer<T extends Api>(api: typeof DoorwardBackendApi, name, middleware?: ApiReducerMiddleware<T>) {
  const actions = generateActions(api, name);

  const reducers = generateReducers(api, name, middleware);

  return { actions, reducers };
}

export default buildApiReducer;
