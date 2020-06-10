import { ADD_STUDENT, FETCH_STUDENT_LIST, GET_STUDENT } from './types';
import Api from '../../services/api';
import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';

const studentList = reducerApiAction({
  action: FETCH_STUDENT_LIST,
  api: Api.users.students.list,
});

const newStudent = reducerApiAction({
  action: ADD_STUDENT,
  api: Api.users.students.create,
});

const student = reducerApiAction({
  action: GET_STUDENT,
  api: Api.users.students.get,
});

export default reducerBuilder({
  middleware: { studentList, newStudent, student },
});
