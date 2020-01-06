import { CREATE_TEACHER, FETCH_ALL_TEACHERS } from './types';
import Api from '../../services/api';
import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';

const teacherList = reducerApiAction({
  action: FETCH_ALL_TEACHERS,
  api: Api.users.teachers.list
});

const createTeacher = reducerApiAction({
  action: CREATE_TEACHER,
  api: Api.users.teachers.create
});

export default reducerBuilder({
  middleware: {
    teacherList,
    createTeacher
  }
});
