import { ReduxApiAction, ReduxReducerApiAction } from '../reducers';
import Api from '../../services/api';
import { CREATE_COURSE, CREATE_COURSE_MODULES, FETCH_COURSES } from './types';
import reducerBuilder from '../builder';

const createCourse: ReduxReducerApiAction = {
  key: 'newCourse',
  action: CREATE_COURSE,
  api: Api.courses.create,
  apiMiddleware: {},
};

const fetchCourses: ReduxReducerApiAction = {
  key: 'courseList',
  action: FETCH_COURSES,
  api: Api.courses.list,
};

const createCourseModules: ReduxApiAction = {
  action: CREATE_COURSE_MODULES,
  api: Api.courses.create,
};

export default reducerBuilder({
  name: 'courses',
  middleware: [createCourse, createCourseModules, fetchCourses],
});
