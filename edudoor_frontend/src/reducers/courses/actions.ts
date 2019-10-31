import { CREATE_COURSE, FETCH_COURSES, VIEW_COURSE } from './types';
import { Action } from '../reducers';
import { CreateCourseBody } from '../../services/models/requestBody';

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
