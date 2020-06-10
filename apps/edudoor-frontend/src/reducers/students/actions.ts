import { ADD_STUDENT, FETCH_STUDENT_LIST, GET_STUDENT } from './types';
import { CreateStudentBody } from '../../services/models/requestBody';
import queryString from 'querystring';

export const fetchStudentListAction = (query?: { notRegisteredTo?: number }) => ({
  type: FETCH_STUDENT_LIST,
  payload: [queryString.stringify(query)],
});

export const addStudentAction = (body: CreateStudentBody) => ({
  type: ADD_STUDENT,
  payload: [body],
});

export const getStudentAction = (id: string) => ({
  type: GET_STUDENT,
  payload: [id],
});
