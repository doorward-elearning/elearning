import {FormikConfig, FormikProps} from 'formik';
import * as React from 'react';
import { Action as ReduxAction, AnyAction, Reducer } from 'redux';

export type State = {
  login: WebComponentState;
}

export interface FormProps<Values> extends FormikConfig<Values>{
  children: ((props: FormikProps<Values>) => React.ReactNode | JSX.Element);
}

export declare type LoginFormState = {
  username: string;
  password: string;
};

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
}

export interface TextFieldProps extends InputProps {
  emptyMessage?: string;
  icon?: string;
  error?: string;
}

export interface PasswordFieldProps extends TextFieldProps{

}

export interface CheckboxProps extends InputProps {
  label?: string;
}

export interface Action extends ReduxAction{
  payload?: object;
}

export type ActionCreator = (...args: any[]) => AnyAction

export type ApiCall = (...args: any[]) => Promise<any>

export type SagaFunction = () => IterableIterator<any>

export type WebComponentState = {
  fetching: boolean;
  fetched: boolean;
  submitting: boolean;
  submitted: boolean;
  data: object;
  errors: any;
};

export type ReducerBuilder<T extends WebComponentState>  = {
  actionType: string;
  endpoint: ApiCall;
  initialState?: T | WebComponentState;
}

export type BuiltReducer = {
  reducer: Reducer;
  watcher: SagaFunction;
}
