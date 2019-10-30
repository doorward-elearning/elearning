import { Action } from '../reducers/reducers';
import { Reducer } from 'react';
import { LoginState } from '../reducers/login';
import { CourseState } from '../reducers/courses';

export type State = {
  login: LoginState;
  courses: CourseState;
};

export type ReducerMapObject<S = any, A extends Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};
