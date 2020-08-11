import Api from '../../services/api';
import _ from 'lodash';
import {
  ADD_MODULE_ITEM,
  CREATE_COURSE,
  CREATE_COURSE_MANAGER,
  CREATE_COURSE_MODULE,
  CREATE_COURSE_MEMBER,
  DELETE_COURSE,
  DELETE_COURSE_MODULE,
  FETCH_COURSE_MANAGERS,
  FETCH_COURSE_MODULE,
  FETCH_COURSE_MEMBERS,
  FETCH_COURSES,
  FETCH_MODULE_ITEM,
  FETCH_MEMBERS_NOT_REGISTERED,
  LIST_MODULE_ITEMS,
  REGISTER_MEMBERS,
  REORDER_COURSE_MODULES,
  START_LIVE_CLASSROOM,
  SUBMIT_ASSIGNMENT,
  UN_ENROLL_MEMBER,
  UPDATE_COURSE,
  UPDATE_COURSE_MODULE,
  VIEW_COURSE,
} from './types';
import reducerBuilder, { modifyReducer, reducerApiAction } from '@doorward/ui/reducers/builder';

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

const memberList = reducerApiAction({
  action: FETCH_COURSE_MEMBERS,
  api: Api.courses.members.get,
  reducer: (state, action) => {
    if (action.type === `${REGISTER_MEMBERS}_SUCCESS`) {
      return modifyReducer('data.members', state, action, members => {
        return _.uniqBy([...members, ...action.payload.members], 'id');
      });
    }
    return state;
  },
});

const managersList = reducerApiAction({
  action: FETCH_COURSE_MANAGERS,
  api: Api.courses.managers.get,
});

const createMember = reducerApiAction({
  action: CREATE_COURSE_MEMBER,
  api: Api.courses.members.create,
});

const unEnrollMember = reducerApiAction({
  action: UN_ENROLL_MEMBER,
  api: Api.courses.members.unEnroll,
});

const notRegistered = reducerApiAction({
  action: FETCH_MEMBERS_NOT_REGISTERED,
  api: Api.courses.members.notRegistered,
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

const registerMembers = reducerApiAction({
  action: REGISTER_MEMBERS,
  api: Api.courses.members.register,
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
  reducer: (state, action) => {
    if (action.type === `${SUBMIT_ASSIGNMENT}_SUCCESS`) {
      return modifyReducer('data.item', state, action, item => {
        return { ...item, assignmentSubmission: action.payload.submission };
      });
    }
    return state;
  },
});

const submitAssignment = reducerApiAction({
  action: SUBMIT_ASSIGNMENT,
  api: Api.courses.modules.items.submitAssignment,
});

const createCourseManager = reducerApiAction({
  action: CREATE_COURSE_MANAGER,
  api: Api.courses.managers.create,
});

export default reducerBuilder({
  middleware: {
    createCourse,
    courseList,
    viewCourse,
    createModule,
    memberList,
    createMember,
    notRegistered,
    addModuleItem,
    viewModule,
    updateCourse,
    updateModule,
    courseModules,
    registerMembers,
    launchClassroom,
    deleteCourse,
    deleteModule,
    moduleItemList,
    moduleItem,
    submitAssignment,
    createCourseManager,
    managersList,
    unEnrollMember,
  },
});
