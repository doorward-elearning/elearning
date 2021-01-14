import { Action } from '@doorward/ui/reducers/reducers';
import { modifyReducer } from '@doorward/ui/reducers/builder';

const getCourse = {
  reducer: (state: any, action: Action) => {
    if (action.type === 'DoorwardBackendApi_courses_createCourseModule_SUCCESS') {
      return modifyReducer('data.course.modules', state, action, (modules) => {
        return [...modules, action.payload.module].sort((a, b) => a.order - b.order);
      });
    } else if (action.type === 'DoorwardBackendApi_modules_deleteModule_SUCCESS') {
      return modifyReducer('data.course.modules', state, action, (modules) => {
        return modules.filter((module) => module.id !== action.payload.id);
      });
    } else if (action.type === 'DoorwardBackendApi_students_addStudentToCourse_SUCCESS') {
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
