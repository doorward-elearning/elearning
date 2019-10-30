import { Action, WebComponentState } from '../reducers/reducers';
import { Reducer } from 'react';
import { LoginState } from '../reducers/login';
import { Course } from '../services/models';

export type State = {
  login: LoginState;
  courses: {
    courseList: WebComponentState<Array<Course>>;
    newCourse: WebComponentState;
  };
};

export type ReducerMapObject<S = any, A extends Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};
