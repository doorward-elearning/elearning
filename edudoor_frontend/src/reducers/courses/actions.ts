import { CREATE_COURSE, FETCH_COURSES } from './types';
import { CreateCourseBody } from '../../services/requestBodies';
import { Action } from '../reducers';

export const fetchCoursesAction = (): Action => ({
  type: FETCH_COURSES,
});

export const createCourseAction = (body: CreateCourseBody, successCallback: () => void): Action => ({
  type: CREATE_COURSE,
  payload: body,
  onSuccess: successCallback,
});
