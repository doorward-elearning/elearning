import { Action, ReduxReducerApiAction, WebComponentState } from '../reducers';
import Api from '../../services/api';
import { CREATE_COURSE, CREATE_COURSE_MDOULE, FETCH_COURSES, VIEW_COURSE } from './types';
import reducerBuilder, { modifyReducer } from '../builder';
import { CourseListResponse, CourseModuleResponse, CreateCourseResponse } from '../../services/models/responseBody';

export interface CourseState {
  newCourse: WebComponentState<CreateCourseResponse>;
  courseList: WebComponentState<CourseListResponse>;
  viewCourse: WebComponentState<CreateCourseResponse>;
  createModule: WebComponentState<CourseModuleResponse>;
}

const createCourse: ReduxReducerApiAction<CreateCourseResponse> = {
  key: 'newCourse',
  action: CREATE_COURSE,
  api: Api.courses.create,
  apiMiddleware: {},
};

const fetchCourses: ReduxReducerApiAction<CourseListResponse> = {
  key: 'courseList',
  action: FETCH_COURSES,
  api: Api.courses.list,
};

const viewCourse: ReduxReducerApiAction<CreateCourseResponse> = {
  key: 'viewCourse',
  action: VIEW_COURSE,
  api: Api.courses.get,
};

const createModule: ReduxReducerApiAction<CourseModuleResponse> = {
  key: 'createModule',
  action: CREATE_COURSE_MDOULE,
  api: Api.courses.modules.create,
};

const reducer = modifyReducer<CourseState>(
  () => 'viewCourse.data.course.modules',
  `${CREATE_COURSE_MDOULE}_SUCCESS`,
  (state, action) => {
    return [...state, action.payload.module];
  }
);

export default reducerBuilder<CourseState>({
  name: 'courses',
  middleware: [createCourse, fetchCourses, viewCourse, createModule],
  reducers: [reducer],
});
