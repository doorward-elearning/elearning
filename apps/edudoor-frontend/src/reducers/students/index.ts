import { ADD_STUDENT, FETCH_STUDENT_LIST } from './types';
import Api from '../../services/api';
import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';

const studentList = reducerApiAction({
  action: FETCH_STUDENT_LIST,
  api: Api.users.students.list
});

const newStudent = reducerApiAction({
  action: ADD_STUDENT,
  api: Api.users.students.create
});

export default reducerBuilder({
  middleware: { studentList, newStudent }
});
