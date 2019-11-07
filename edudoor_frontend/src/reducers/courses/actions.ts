import {
  CREATE_COURSE,
  CREATE_COURSE_MODULE,
  CREATE_COURSE_STUDENT,
  FETCH_COURSE_STUDENTS,
  FETCH_COURSES,
  FETCH_STUDENTS_NOT_REGISTERED,
  VIEW_COURSE,
} from './types';
import { Action } from '../reducers';
import { CourseModuleBody, CreateCourseBody, CreateStudentBody } from '../../services/models/requestBody';

export const fetchCoursesAction = (): Action => ({
  type: FETCH_COURSES,
});

export const createCourseAction = (body: CreateCourseBody, successCallback: () => void): Action => ({
  type: CREATE_COURSE,
  payload: body,
  onSuccess: successCallback,
});

export const fetchCourseAction = (courseId: number): Action => ({
  type: VIEW_COURSE,
  payload: [courseId],
});

export const createCourseModuleAction = (courseId: number, module: CourseModuleBody): Action => ({
  type: CREATE_COURSE_MODULE,
  payload: [courseId, module],
});

export const fetchCourseStudentListAction = (courseId: number): Action => ({
  type: FETCH_COURSE_STUDENTS,
  payload: [courseId],
});

export const addCourseStudentAction = (courseId: number, body: CreateStudentBody): Action => ({
  type: CREATE_COURSE_STUDENT,
  payload: [courseId, body],
});

export const fetchStudentsNotRegisteredAction = (courseId: number) => ({
  type: FETCH_STUDENTS_NOT_REGISTERED,
  payload: [courseId],
});
