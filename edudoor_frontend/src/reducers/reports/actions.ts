import { FETCH_STUDENT_REPORT_LIST } from './types';
import { Action } from '../reducers';

export const fetchStudentReportsList = (): Action => ({
  type: FETCH_STUDENT_REPORT_LIST,
});
