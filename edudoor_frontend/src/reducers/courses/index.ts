import { ReduxReducerApiAction, WebComponentState } from '../reducers';
import Api from '../../services/api';
import { CREATE_COURSE, FETCH_COURSES } from './types';
import reducerBuilder, { webComponentState } from '../builder';
import { CourseListResponse, CreateCourseResponse } from '../../services/models/responseBody';

export interface CourseState {
  newCourse: WebComponentState<CreateCourseResponse>;
  courseList: WebComponentState<CourseListResponse>;
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

export default reducerBuilder<CourseState>({
  initialState: { ...webComponentState, data: {} },
  name: 'courses',
  middleware: [createCourse, fetchCourses],
});
