import Request from './request';
import { CourseModuleBody, CreateCourseBody, CreateStudentBody } from './models/requestBody';
import {
  CourseListResponse,
  CourseModuleResponse,
  CreateCourseResponse,
  LoginResponse,
  StudentListResponse,
  StudentResponse,
} from './models/responseBody';

const q = require('querystring').stringify;

const { GET, PUT, POST } = Request;

const Api = {
  users: {
    authenticate: (body: { username: string; password: string }): Promise<LoginResponse> =>
      POST('users/authenticate', body),
  },
  courses: {
    create: async (course: CreateCourseBody): Promise<CreateCourseResponse> => POST('/courses', course),
    list: (): Promise<CourseListResponse> => GET('/courses'),
    get: (courseId: number): Promise<CreateCourseResponse> => GET(`/courses/${courseId}`),
    modules: {
      get: (courseId: number): Promise<CourseModuleResponse> => GET(`/courses/${courseId}/modules`),
      create: (courseId: number, module: CourseModuleBody): Promise<CourseModuleResponse> =>
        POST(`/courses/${courseId}/modules`, module),
    },
    students: {
      get: (courseId: number): Promise<StudentListResponse> => GET(`/courses/${courseId}/students`),
      create: (courseId: number, student: CreateStudentBody): Promise<StudentResponse> =>
        POST(`/courses/${courseId}/students`, student),
    },
  },
};

export default Api;
