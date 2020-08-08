import {
  ADD_MODULE_ITEM,
  CREATE_COURSE,
  CREATE_COURSE_MANAGER,
  CREATE_COURSE_MODULE,
  CREATE_COURSE_STUDENT,
  DELETE_COURSE,
  DELETE_COURSE_MODULE,
  FETCH_COURSE_MANAGERS,
  FETCH_COURSE_MODULE,
  FETCH_COURSE_STUDENTS,
  FETCH_COURSES,
  FETCH_MODULE_ITEM,
  FETCH_STUDENTS_NOT_REGISTERED,
  LIST_MODULE_ITEMS,
  REGISTER_STUDENTS,
  REORDER_COURSE_MODULES,
  START_LIVE_CLASSROOM,
  SUBMIT_ASSIGNMENT,
  UN_ENROLL_STUDENT,
  UPDATE_COURSE,
  UPDATE_COURSE_MODULE,
  VIEW_COURSE,
} from './types';
import {
  CourseModuleBody,
  CourseModuleItemBody,
  CreateCourseBody,
  CreateCourseManagerBody,
  CreateStudentBody,
  RegisterStudentsBody,
  SearchQueryBody,
  SubmitAssignmentBody,
  UpdateModulesBody,
} from '../../services/models/requestBody';
import { Action } from '@doorward/ui/reducers/reducers';
import { ModuleItemTypes } from '@doorward/common/models';

export const fetchCoursesAction = (): Action => ({
  type: FETCH_COURSES,
});

export const createCourseAction = (body: CreateCourseBody, successCallback: () => void): Action => ({
  type: CREATE_COURSE,
  payload: body,
  onSuccess: successCallback,
});

export const fetchCourseAction = (courseId: string): Action => ({
  type: VIEW_COURSE,
  payload: [courseId],
});

export const createCourseModuleAction = (courseId: string, module: CourseModuleBody): Action => ({
  type: CREATE_COURSE_MODULE,
  payload: [courseId, module],
});

export const fetchCourseModuleAction = (moduleId: string) => ({
  type: FETCH_COURSE_MODULE,
  payload: [moduleId],
});

export const fetchCourseStudentListAction = (courseId: string): Action => ({
  type: FETCH_COURSE_STUDENTS,
  payload: [courseId],
});

export const unEnrollStudentAction = (studentId: string, courseId: string): Action => ({
  type: UN_ENROLL_STUDENT,
  payload: [studentId, courseId],
});

export const addCourseStudentAction = (courseId: string, body: CreateStudentBody): Action => ({
  type: CREATE_COURSE_STUDENT,
  payload: [courseId, body],
});

export const fetchStudentsNotRegisteredAction = (courseId: string, query?: SearchQueryBody) => ({
  type: FETCH_STUDENTS_NOT_REGISTERED,
  payload: [courseId, query],
});

export const createCourseModuleItemAction = (moduleId: string, item: CourseModuleItemBody): Action => ({
  type: ADD_MODULE_ITEM,
  payload: [moduleId, item],
});

export const updateCourseAction = (courseId: string, body: CreateCourseBody): Action => ({
  type: UPDATE_COURSE,
  payload: [courseId, body],
});

export const updateCourseModuleAction = (moduleId: string, body: CourseModuleBody): Action => ({
  type: UPDATE_COURSE_MODULE,
  payload: [moduleId, body],
});

export const reorderCourseModules = (courseId: string, body: UpdateModulesBody): Action => ({
  type: REORDER_COURSE_MODULES,
  payload: [courseId, body],
});

export const registerStudents = (courseId: string, body: RegisterStudentsBody): Action => ({
  type: REGISTER_STUDENTS,
  payload: [courseId, body],
});

export const startLiveClassroom = (courseId: string): Action => ({
  type: START_LIVE_CLASSROOM,
  payload: [courseId],
});

export const deleteCourseAction = (courseId: string): Action => ({
  type: DELETE_COURSE,
  payload: [courseId],
});

export const deleteCourseModuleAction = (moduleId: string): Action => ({
  type: DELETE_COURSE_MODULE,
  payload: [moduleId],
});

export const fetchModuleItems = (courseId: string, type: ModuleItemTypes): Action => ({
  type: LIST_MODULE_ITEMS,
  payload: [courseId, type],
});

export const fetchModuleItem = (itemId: string): Action => ({
  type: FETCH_MODULE_ITEM,
  payload: [itemId],
});

export const submitAssignmentAction = (assignmentId: string, body: SubmitAssignmentBody): Action => ({
  type: SUBMIT_ASSIGNMENT,
  payload: [assignmentId, body],
});

export const createCourseManagerAction = (courseId: string, body: CreateCourseManagerBody): Action => ({
  type: CREATE_COURSE_MANAGER,
  payload: [courseId, body],
});

export const fetchCourseManagersAction = (courseId: string): Action => ({
  type: FETCH_COURSE_MANAGERS,
  payload: [courseId],
});
