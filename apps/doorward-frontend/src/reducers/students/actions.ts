import {
  ADD_STUDENT,
  CHANGE_STUDENTS_ACCOUNT_INFORMATION,
  CHANGE_STUDENTS_PASSWORD,
  FETCH_STUDENT_LIST,
  GET_STUDENT,
} from './types';
import { AccountDetailsBody, ChangePasswordBody, CreateStudentBody } from '../../services/models/requestBody';
import { PaginationQuery } from '@doorward/common/types/api';
import { ActionCreator } from '@doorward/ui/reducers/reducers';

export const fetchStudentListAction: ActionCreator = (
  pagination?: PaginationQuery,
  query?: { notRegisteredTo?: number }
) => ({
  type: FETCH_STUDENT_LIST,
  payload: [query],
  pagination,
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
