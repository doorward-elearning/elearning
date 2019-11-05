import { ADD_STUDENT, FETCH_STUDENT_LIST } from './types';
import { CreateStudentBody } from '../../services/models/requestBody';

export const fetchStudentListAction = () => ({
  type: FETCH_STUDENT_LIST,
});

export const addStudentAction = (body: CreateStudentBody) => ({
  type: ADD_STUDENT,
  payload: [body],
});
