import {
  FETCH_COURSE_CREATOR_REPORT,
  FETCH_COURSE_CREATOR_REPORT_LIST,
  FETCH_STUDENT_REPORT,
  FETCH_STUDENT_REPORT_LIST,
} from './types';
import { Action } from '../reducers';

export const fetchStudentReportsList = (): Action => ({
  type: FETCH_STUDENT_REPORT_LIST,
});

export const fetchStudentReport = (studentId: string): Action => ({
  type: FETCH_STUDENT_REPORT,
  payload: [studentId],
});

export const fetchCourseCreatorReportList = (): Action => ({
  type: FETCH_COURSE_CREATOR_REPORT_LIST,
});

export const fetchCourseCreatorReport = (teacherId: string): Action => ({
  type: FETCH_COURSE_CREATOR_REPORT,
  payload: [teacherId],
});
