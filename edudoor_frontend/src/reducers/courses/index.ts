import Api from '../../services/api';
import {
  ADD_MODULE_ITEM,
  CREATE_COURSE,
  CREATE_COURSE_MODULE,
  CREATE_COURSE_STUDENT,
  FETCH_COURSE_MODULE,
  FETCH_COURSE_STUDENTS,
  FETCH_COURSES,
  FETCH_STUDENTS_NOT_REGISTERED,
  UPDATE_COURSE,
  UPDATE_COURSE_MODULE,
  VIEW_COURSE,
} from './types';
import reducerBuilder, { modifyReducer, reducerApiAction } from '../builder';

const createCourse = reducerApiAction({
  action: CREATE_COURSE,
  api: Api.courses.create,
  apiMiddleware: {},
});

const courseList = reducerApiAction({
  action: FETCH_COURSES,
  api: Api.courses.list,
});

const viewCourse = reducerApiAction({
  action: VIEW_COURSE,
  api: Api.courses.get,
  reducer: (state, action) => {
    if (action.type === `${CREATE_COURSE_MODULE}_SUCCESS`) {
      return modifyReducer('data.course.modules', state, action, modules => {
        return [...modules, action.payload.module];
      });
    }
    return state;
  },
});

const createModule = reducerApiAction({
  action: CREATE_COURSE_MODULE,
  api: Api.courses.modules.create,
});

const studentList = reducerApiAction({
  action: FETCH_COURSE_STUDENTS,
  api: Api.courses.students.get,
});

const createStudent = reducerApiAction({
  action: CREATE_COURSE_STUDENT,
  api: Api.courses.students.create,
});

const notRegistered = reducerApiAction({
  action: FETCH_STUDENTS_NOT_REGISTERED,
  api: Api.courses.students.notRegistered,
});

const addModuleItem = reducerApiAction({
  action: ADD_MODULE_ITEM,
  api: Api.courses.modules.items.create,
});

const viewModule = reducerApiAction({
  action: FETCH_COURSE_MODULE,
  api: Api.courses.modules.get,
});

const updateCourse = reducerApiAction({
  action: UPDATE_COURSE,
  api: Api.courses.update,
});

const updateModule = reducerApiAction({
  action: UPDATE_COURSE_MODULE,
  api: Api.courses.modules.update,
});

export default reducerBuilder({
  middleware: {
    createCourse,
    courseList,
    viewCourse,
    createModule,
    studentList,
    createStudent,
    notRegistered,
    addModuleItem,
    viewModule,
    updateCourse,
    updateModule,
  },
});
