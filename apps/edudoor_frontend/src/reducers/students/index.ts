import reducerBuilder, { reducerApiAction } from '../../../../../libs/ui/reducers/builder';
import { ADD_STUDENT, FETCH_STUDENT_LIST } from './types';
import Api from '../../services/api';

const studentList = reducerApiAction({
  action: FETCH_STUDENT_LIST,
  api: Api.users.students.list,
});

const newStudent = reducerApiAction({
  action: ADD_STUDENT,
  api: Api.users.students.create,
});

export default reducerBuilder({
  middleware: { studentList, newStudent },
});
