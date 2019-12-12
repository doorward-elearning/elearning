import {
  ADD_MODULE_ITEM,
  CREATE_COURSE,
  CREATE_COURSE_MODULE,
  CREATE_COURSE_STUDENT,
  FETCH_COURSE_MODULE,
  FETCH_COURSE_STUDENTS,
  FETCH_COURSES,
  FETCH_STUDENTS_NOT_REGISTERED,
  REGISTER_STUDENTS,
  REORDER_COURSE_MODULES,
  START_LIVE_CLASSROOM,
  UPDATE_COURSE,
  UPDATE_COURSE_MODULE,
  VIEW_COURSE,
} from './types';
import { Action } from '../reducers';
import {
  CourseModuleBody,
  CourseModuleItemBody,
  CreateCourseBody,
  CreateStudentBody,
  RegisterStudentsBody,
  UpdateModulesBody,
} from '../../services/models/requestBody';

export const fetchCoursesAction = (): Action => ({
  type: FETCH_COURSES,
});

export const createCourseAction = (body: CreateCourseBody, successCallback: () => void): Action => ({
  type: CREATE_COURSE,
  payload: body,
  onSuccess: successCallback,
});

export const fetchCourseAction = (courseId: string): Action => ({
  type: VIEW_COURSE,
  payload: [courseId],
});

export const createCourseModuleAction = (courseId: string, module: CourseModuleBody): Action => ({
  type: CREATE_COURSE_MODULE,
  payload: [courseId, module],
});

export const fetchCourseModuleAction = (moduleId: string) => ({
  type: FETCH_COURSE_MODULE,
  payload: [moduleId],
});

export const fetchCourseStudentListAction = (courseId: string): Action => ({
  type: FETCH_COURSE_STUDENTS,
  payload: [courseId],
});

export const addCourseStudentAction = (courseId: string, body: CreateStudentBody): Action => ({
  type: CREATE_COURSE_STUDENT,
  payload: [courseId, body],
});

export const fetchStudentsNotRegisteredAction = (courseId: string) => ({
  type: FETCH_STUDENTS_NOT_REGISTERED,
  payload: [courseId],
});

export const createCourseModuleItemAction = (moduleId: string, item: CourseModuleItemBody): Action => ({
  type: ADD_MODULE_ITEM,
  payload: [moduleId, item],
});

export const updateCourseAction = (courseId: string, body: CreateCourseBody): Action => ({
  type: UPDATE_COURSE,
  payload: [courseId, body],
});

export const updateCourseModuleAction = (moduleId: string, body: CourseModuleBody): Action => ({
  type: UPDATE_COURSE_MODULE,
  payload: [moduleId, body],
});

export const reorderCourseModules = (courseId: string, body: UpdateModulesBody): Action => ({
  type: REORDER_COURSE_MODULES,
  payload: [courseId, body],
});

export const registerStudents = (courseId: string, body: RegisterStudentsBody): Action => ({
  type: REGISTER_STUDENTS,
  payload: [courseId, body],
});

export const startLiveClassroom = (courseId: string): Action => ({
  type: START_LIVE_CLASSROOM,
  payload: [courseId],
});
