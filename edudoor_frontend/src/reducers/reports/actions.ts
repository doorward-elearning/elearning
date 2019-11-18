import { FETCH_COURSE_CREATOR_REPORT_LIST, FETCH_STUDENT_REPORT, FETCH_STUDENT_REPORT_LIST } from './types';
import { Action } from '../reducers';

export const fetchStudentReportsList = (): Action => ({
  type: FETCH_STUDENT_REPORT_LIST,
});

export const fetchStudentReport = (studentId: string): Action => ({
  type: FETCH_STUDENT_REPORT,
  payload: [studentId],
});

export const fetchCourseCreatorReport = (): Action => ({
  type: FETCH_COURSE_CREATOR_REPORT_LIST,
});
