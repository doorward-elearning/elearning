import Api from '../../services/api';
import _ from 'lodash';
import {
  ADD_MODULE_ITEM,
  CREATE_COURSE,
  CREATE_COURSE_MODULE,
  CREATE_COURSE_STUDENT,
  DELETE_COURSE,
  DELETE_COURSE_MODULE,
  FETCH_COURSE_MODULE,
  FETCH_COURSE_STUDENTS,
  FETCH_COURSES,
  FETCH_MODULE_ITEM,
  FETCH_STUDENTS_NOT_REGISTERED,
  LIST_MODULE_ITEMS,
  REGISTER_STUDENTS,
  REORDER_COURSE_MODULES,
  START_LIVE_CLASSROOM,
  SUBMIT_ASSIGNMENT,
  UPDATE_COURSE,
  UPDATE_COURSE_MODULE,
  VIEW_COURSE,
} from './types';
import reducerBuilder, { modifyReducer, reducerApiAction } from '@edudoor/ui/reducers/builder';

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
    } else if (action.type === `${REORDER_COURSE_MODULES}_SUCCESS`) {
      return modifyReducer('data.course.modules', state, action, () => {
        return [...action.payload.modules];
      });
    } else if (action.type === `${DELETE_COURSE_MODULE}_SUCCESS`) {
      return modifyReducer('data.course.modules', state, action, modules => {
        return [...modules.filter(module => module.id !== action.payload.id)];
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
  reducer: (state, action) => {
    if (action.type === `${REGISTER_STUDENTS}_SUCCESS`) {
      return modifyReducer('data.students', state, action, students => {
        return _.uniqBy([...students, ...action.payload.students], 'id');
      });
    }
    return state;
  },
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

const courseModules = reducerApiAction({
  action: REORDER_COURSE_MODULES,
  api: Api.courses.updateModules,
});

const registerStudents = reducerApiAction({
  action: REGISTER_STUDENTS,
  api: Api.courses.students.register,
});

const launchClassroom = reducerApiAction({
  action: START_LIVE_CLASSROOM,
  api: Api.courses.room.start,
});

const deleteCourse = reducerApiAction({
  action: DELETE_COURSE,
  api: Api.courses.delete,
});

const deleteModule = reducerApiAction({
  action: DELETE_COURSE_MODULE,
  api: Api.courses.modules.delete,
});

const moduleItemList = reducerApiAction({
  action: LIST_MODULE_ITEMS,
  api: Api.courses.modules.items.list,
});

const moduleItem = reducerApiAction({
  action: FETCH_MODULE_ITEM,
  api: Api.courses.modules.items.get,
});

const submitAssignment = reducerApiAction({
  action: SUBMIT_ASSIGNMENT,
  api: Api.courses.modules.items.submitAssignment,
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
    courseModules,
    registerStudents,
    launchClassroom,
    deleteCourse,
    deleteModule,
    moduleItemList,
    moduleItem,
    submitAssignment,
  },
});
