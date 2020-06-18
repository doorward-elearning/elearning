import {
  ADD_STUDENT,
  CHANGE_STUDENTS_ACCOUNT_INFORMATION,
  CHANGE_STUDENTS_PASSWORD,
  FETCH_STUDENT_LIST,
  GET_STUDENT,
} from './types';
import { AccountDetailsBody, ChangePasswordBody, CreateStudentBody } from '../../services/models/requestBody';
import queryString from 'querystring';
import { PaginationQuery } from '@edudoor/common/types/api';
import { ActionCreator } from '@edudoor/ui/reducers/reducers';

export const fetchStudentListAction: ActionCreator = (query?: { notRegisteredTo?: number } & PaginationQuery) => ({
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

export const changeStudentsAccountInformationAction = (id: string, body: AccountDetailsBody) => ({
  type: CHANGE_STUDENTS_ACCOUNT_INFORMATION,
  payload: [id, body],
});
