import {
  Action,
  ApiCall,
  BuiltReducer,
  ReducerBuilder,
  SagaFunction,
  WebComponentState,
} from '../types';
import { Reducer } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

export const createAction = (type: string, data: any): Action => {
  return ({ type, payload: data });
};

const defaultState: WebComponentState = {
  fetched: false,
  fetching: false,
  submitted: false,
  submitting: false,
  data: {},
  errors: null
};

function createReducer<T extends WebComponentState> (initialState: T | WebComponentState, actionType: string): Reducer{

  return (state = initialState, action: Action): T => {
    switch (action.type) {
    case actionType:
      return {
        ...state,
        fetched: false,
        fetching: true,
        submitted: false,
        submitting: true,
        errors: null
      };
    case `${actionType}_SUCCESS`:
      return {
        ...state,
        fetched: true,
        fetching: false,
        submitted: true,
        submitting: false,
        data: action.payload,
        errors: null
      };
    case `${actionType}_FAILURE`:
      return {
        ...state,
        fetched: false,
        fetching: false,
        submitted: true,
        submitting: false,
        errors: action.payload
      };
    default:
      return state;
    }
  };
}

const createMiddleware = (actionType: string, endpoint: ApiCall): SagaFunction=> {
  function * makeApiCall(action: Action): IterableIterator<any>{
    try{
      const response = yield call(endpoint, action.payload);
      if(response){
        const { data } = response;
        yield put({
          type: `${actionType}_SUCCESS`,
          payload: data
        });
      }
    }catch(error){
      const data = { status: 0, payload: null };
      if(error.response){
        data.status = error.response.status;
        data.payload = error.response.payload;
      }else {
        data.status = 500;
      }
      yield put({
        type: `${actionType}_FAILURE`,
        payload: {
          ...data
        }
      });
    }
  }

  function * watchForAction(): IterableIterator<any>{
    yield takeLatest(actionType, makeApiCall);
  }
  return watchForAction;
};

export default function reducerBuilder<T extends WebComponentState = WebComponentState>(
  { actionType, initialState = defaultState, endpoint }: ReducerBuilder<T>
): BuiltReducer {
  const reducer = createReducer<T>(initialState, actionType);
  const watcher = createMiddleware(actionType, endpoint);

  return {
    reducer,
    watcher
  };
}
