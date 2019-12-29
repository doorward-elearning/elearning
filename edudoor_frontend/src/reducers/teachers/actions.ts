import { CREATE_TEACHER, FETCH_ALL_TEACHERS } from './types';

export const fetchTeacherListAction = () => ({
  type: FETCH_ALL_TEACHERS,
});

export const createTeacherAction = () => ({
  type: CREATE_TEACHER,
});
