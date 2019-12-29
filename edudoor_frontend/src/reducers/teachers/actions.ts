import { CREATE_TEACHER, FETCH_ALL_TEACHERS } from './types';
import { CreateTeacherBody } from '../../services/models/requestBody';

export const fetchTeacherListAction = (query = '') => ({
  type: FETCH_ALL_TEACHERS,
  payload: [query],
});

export const createTeacherAction = (body: CreateTeacherBody) => ({
  type: CREATE_TEACHER,
  payload: [body],
});
