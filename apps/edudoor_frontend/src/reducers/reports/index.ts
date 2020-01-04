import reducerBuilder, { reducerApiAction } from '../../../../../libs/ui/reducers/builder';
import {
  FETCH_COURSE_CREATOR_REPORT,
  FETCH_COURSE_CREATOR_REPORT_LIST,
  FETCH_STUDENT_REPORT,
  FETCH_STUDENT_REPORT_LIST,
} from './types';
import Api from '../../services/api';

const studentReportList = reducerApiAction({
  action: FETCH_STUDENT_REPORT_LIST,
  api: Api.reports.students.list,
});

const singleStudent = reducerApiAction({
  action: FETCH_STUDENT_REPORT,
  api: Api.reports.students.get,
});

const teacherReportList = reducerApiAction({
  action: FETCH_COURSE_CREATOR_REPORT_LIST,
  api: Api.reports.teachers.list,
});

const singleTeacher = reducerApiAction({
  action: FETCH_COURSE_CREATOR_REPORT,
  api: Api.reports.teachers.get,
});

export default reducerBuilder({
  middleware: {
    studentReportList,
    singleStudent,
    teacherReportList,
    singleTeacher,
  },
});
