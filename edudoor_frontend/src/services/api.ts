import Request from './request';
import { CourseModuleBody, CourseModuleItemBody, CreateCourseBody, CreateStudentBody } from './models/requestBody';
import {
  CourseListResponse,
  CourseModuleResponse,
  CreateCourseResponse,
  LoginResponse,
  ModuleItemResponse,
  StudentListResponse,
  StudentResponse,
} from './models/responseBody';

const q = require('querystring').stringify;

const { GET, PUT, POST } = Request;

const Api = {
  users: {
    authenticate: (body: { username: string; password: string }): Promise<LoginResponse> =>
      POST('users/authenticate', body),
    students: {
      list: (query: string): Promise<StudentListResponse> => GET('/users/students?' + query),
      create: (body: CreateStudentBody): Promise<StudentResponse> => POST('/users/students', body),
    },
  },
  courses: {
    create: async (course: CreateCourseBody): Promise<CreateCourseResponse> => POST('/courses', course),
    list: (): Promise<CourseListResponse> => GET('/courses'),
    get: (courseId: number): Promise<CreateCourseResponse> => GET(`/courses/${courseId}`),
    modules: {
      get: (courseId: number): Promise<CourseModuleResponse> => GET(`/courses/${courseId}/modules`),
      create: (courseId: number, module: CourseModuleBody): Promise<CourseModuleResponse> =>
        POST(`/courses/${courseId}/modules`, module),
      items: {
        create: (courseId: number, moduleId: number, item: CourseModuleItemBody): Promise<ModuleItemResponse> =>
          POST(`/courses/${courseId}/modules/${moduleId}/items/`, item),
      },
    },
    students: {
      get: (courseId: number): Promise<StudentListResponse> => GET(`/courses/${courseId}/students`),
      create: (courseId: number, student: CreateStudentBody): Promise<StudentResponse> =>
        POST(`/courses/${courseId}/students`, student),
      notRegistered: (courseId: number): Promise<StudentListResponse> =>
        GET(`/courses/${courseId}/students/not-registered`),
    },
  },
};

export default Api;
