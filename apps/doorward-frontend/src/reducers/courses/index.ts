import { Action } from '@doorward/ui/reducers/reducers';
import { modifyReducer } from '@doorward/ui/reducers/builder';
import { DoorwardApiTypes } from '../../services/apis/doorward.api';

const getCourse = {
  reducer: (state: any, action: Action) => {
    if (action.type === DoorwardApiTypes.courses.createCourseModule + '_SUCCESS') {
      return modifyReducer('data.course.modules', state, action, (modules) => {
        return [...modules, action.payload.module].sort((a, b) => a.order - b.order);
      });
    } else if (action.type === DoorwardApiTypes.modules.deleteModule + '_SUCCESS') {
      return modifyReducer('data.course.modules', state, action, (modules) => {
        return modules.filter((module) => module.id !== action.payload.id);
      });
    } else if (action.type === DoorwardApiTypes.students.addStudentToCourse + '_SUCCESS') {
      return modifyReducer('data.course.students', state, action, (students) => {
        return [...students, ...action.payload.students];
      });
    } else {
      return state;
    }
  },
};

export default {
  getCourse,
};
