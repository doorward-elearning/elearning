import reducerBuilder, { reducerApiAction } from '../builder';
import { FETCH_STUDENT_REPORT, FETCH_STUDENT_REPORT_LIST } from './types';
import Api from '../../services/api';

const studentReportList = reducerApiAction({
  action: FETCH_STUDENT_REPORT_LIST,
  api: Api.reports.students.list,
});

const singleStudent = reducerApiAction({
  action: FETCH_STUDENT_REPORT,
  api: Api.reports.students.get,
});

export default reducerBuilder({
  middleware: {
    studentReportList,
    singleStudent,
  },
});
