import reducerBuilder, { reducerApiAction } from '../builder';
import { CREATE_TEACHER, FETCH_ALL_TEACHERS } from './types';
import Api from '../../services/api';

const teacherList = reducerApiAction({
  action: FETCH_ALL_TEACHERS,
  api: Api.users.teachers.list,
});

const createTeacher = reducerApiAction({
  action: CREATE_TEACHER,
  api: Api.users.teachers.create,
});

export default reducerBuilder({
  middleware: {
    teacherList,
    createTeacher,
  },
});
