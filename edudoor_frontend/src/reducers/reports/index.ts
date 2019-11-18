import reducerBuilder, { reducerApiAction } from '../builder';
import { FETCH_COURSE_CREATOR_REPORT_LIST, FETCH_STUDENT_REPORT, FETCH_STUDENT_REPORT_LIST } from './types';
import Api from '../../services/api';

const studentReportList = reducerApiAction({
  action: FETCH_STUDENT_REPORT_LIST,
  api: Api.reports.students.list,
});

const singleStudent = reducerApiAction({
  action: FETCH_STUDENT_REPORT,
  api: Api.reports.students.get,
});

const courseCreatorReportList = reducerApiAction({
  action: FETCH_COURSE_CREATOR_REPORT_LIST,
  api: Api.reports.courseCreators.list,
});

export default reducerBuilder({
  middleware: {
    studentReportList,
    singleStudent,
    courseCreatorReportList,
  },
});
