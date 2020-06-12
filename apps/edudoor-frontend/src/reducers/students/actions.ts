import { ADD_STUDENT, CHANGE_STUDENTS_PASSWORD, FETCH_STUDENT_LIST, GET_STUDENT } from './types';
import { ChangePasswordBody, CreateStudentBody } from '../../services/models/requestBody';
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

export const changeStudentsPassword = (id: string, body: ChangePasswordBody) => ({
  type: CHANGE_STUDENTS_PASSWORD,
  payload: [id, body],
});
