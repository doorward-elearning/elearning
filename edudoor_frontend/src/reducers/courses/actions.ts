import { CREATE_COURSE, CREATE_COURSE_MODULE, FETCH_COURSE_STUDENTS, FETCH_COURSES, VIEW_COURSE } from './types';
import { Action } from '../reducers';
import { CourseModuleBody, CreateCourseBody } from '../../services/models/requestBody';

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
