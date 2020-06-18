import {
  ADD_STUDENT,
  CHANGE_STUDENTS_ACCOUNT_INFORMATION,
  CHANGE_STUDENTS_PASSWORD,
  FETCH_STUDENT_LIST,
  GET_STUDENT,
} from './types';
import Api from '../../services/api';
import reducerBuilder, { modifyReducer, reducerApiAction } from '@edudoor/ui/reducers/builder';

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
  reducer: (state, action) => {
    if (action.type === `${CHANGE_STUDENTS_ACCOUNT_INFORMATION}_SUCCESS`) {
      return modifyReducer('data.student', state, action, current => {
        return { ...current, ...action.payload.student };
      });
    }
    return state;
  },
});

const changePassword = reducerApiAction({
  action: CHANGE_STUDENTS_PASSWORD,
  api: Api.users.students.changePassword,
});

const changeAccountDetails = reducerApiAction({
  action: CHANGE_STUDENTS_ACCOUNT_INFORMATION,
  api: Api.users.students.update,
});

export default reducerBuilder({
  middleware: { studentList, newStudent, student, changePassword, changeAccountDetails },
});
