import { CREATE_COURSE, FETCH_COURSES } from './types';
import { CreateCourseBody } from '../../services/requestBodies';

export const fetchCoursesAction = () => ({
  type: FETCH_COURSES,
});

export const createCourseAction = (body: CreateCourseBody) => ({
  type: CREATE_COURSE,
  payload: body,
});
