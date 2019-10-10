import {ApiCall} from "../types";
import {Action as ReduxAction, AnyAction, Reducer} from 'redux';

export type SagaFunction = () => IterableIterator<any>

export interface Action extends ReduxAction {
    payload?: object;
}

export type ActionCreator = (...args: any[]) => AnyAction

export type WebComponentState = {
    fetching: boolean;
    fetched: boolean;
    submitting: boolean;
    submitted: boolean;
    data: object;
    errors: any;
};

export type ReducerBuilder<T extends WebComponentState> = {
    actionType: string;
    endpoint: ApiCall;
    initialState?: T | WebComponentState;
}

export type BuiltReducer = {
    reducer: Reducer;
    watcher: SagaFunction;
}
