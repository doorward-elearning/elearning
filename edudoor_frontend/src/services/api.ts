import Request from './request';
import {
  AccountDetailsBody,
  ChangePasswordBody,
  CourseModuleBody,
  CourseModuleItemBody,
  CreateCourseBody,
  CreateStudentBody,
} from './models/requestBody';
import {
  CourseListResponse,
  CourseModuleResponse,
  CreateCourseResponse,
  LoginResponse,
  ModuleItemResponse,
  StudentListResponse,
  StudentResponse,
  UserResponse,
} from './models/responseBody';
import { ApiResponse } from './services';

const q = require('querystring').stringify;

const { GET, PUT, POST } = Request;

const Api = {
  users: {
    authenticate: (body: { username: string; password: string }): Promise<LoginResponse> => POST('users/auth', body),
    currentUser: (): Promise<UserResponse> => GET('/users/auth'),
    profile: {
      updateAccount: (body: AccountDetailsBody): Promise<UserResponse> => PUT('/users/profile/account', body),
      changePassword: (body: ChangePasswordBody): Promise<ApiResponse> => PUT('/users/profile/password', body),
    },
    students: {
      list: (query: string): Promise<StudentListResponse> => GET('/users/students?' + query),
      create: (body: CreateStudentBody): Promise<StudentResponse> => POST('/users/students', body),
    },
  },
  courses: {
    create: async (course: CreateCourseBody): Promise<CreateCourseResponse> => POST('/courses', course),
    list: (): Promise<CourseListResponse> => GET('/courses'),
    get: (courseId: string): Promise<CreateCourseResponse> => GET(`/courses/${courseId}`),
    modules: {
      get: (courseId: string): Promise<CourseModuleResponse> => GET(`/courses/${courseId}/modules`),
      create: (courseId: string, module: CourseModuleBody): Promise<CourseModuleResponse> =>
        POST(`/courses/${courseId}/modules`, module),
      items: {
        create: (courseId: string, moduleId: string, item: CourseModuleItemBody): Promise<ModuleItemResponse> =>
          POST(`/courses/${courseId}/modules/${moduleId}/items/`, item),
      },
    },
    students: {
      get: (courseId: string): Promise<StudentListResponse> => GET(`/courses/${courseId}/students`),
      create: (courseId: string, student: CreateStudentBody): Promise<StudentResponse> =>
        POST(`/courses/${courseId}/students`, student),
      notRegistered: (courseId: string): Promise<StudentListResponse> =>
        GET(`/courses/${courseId}/students/not-registered`),
    },
  },
};

export default Api;
