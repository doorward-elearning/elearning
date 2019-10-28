import { Action, WebComponentState } from '../reducers/reducers';
import { Reducer } from 'react';
import { CourseResponse } from '../services/responseBodies';

export type State = {
  login: WebComponentState;
  courses: {
    courseList: WebComponentState<Array<CourseResponse>>;
    newCourse: WebComponentState;
  };
};

export type ReducerMapObject<S = any, A extends Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};
