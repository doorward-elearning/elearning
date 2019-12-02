import Request from './request';
import {
  AccountDetailsBody,
  ChangePasswordBody,
  CourseModuleBody,
  CourseModuleItemBody,
  CreateCourseBody,
  CreatePasswordBody,
  CreateStudentBody,
  ForgotPasswordBody,
  LoginBody,
  RegistrationBody,
} from './models/requestBody';
import {
  CourseCreatorListResponse,
  CourseCreatorResponse,
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
    authenticate: (body: LoginBody): Promise<LoginResponse> => POST('users/auth', body),
    register: (body: RegistrationBody): Promise<LoginResponse> => POST('/users/register', body),
    currentUser: (): Promise<UserResponse> => GET('/users/auth'),
    profile: {
      updateAccount: (body: AccountDetailsBody): Promise<UserResponse> => PUT('/users/profile/account', body),
      changePassword: (body: ChangePasswordBody): Promise<ApiResponse> => PUT('/users/profile/password', body),
      resetPassword: (body: CreatePasswordBody): Promise<ApiResponse> => POST('/users/profile/resetPassword', body),
      forgotPassword: (body: ForgotPasswordBody): Promise<ApiResponse> => POST('/users/profile/forgotPassword', body),
    },
    students: {
      list: (query: string): Promise<StudentListResponse> => GET('/users/students?' + query),
      create: (body: CreateStudentBody): Promise<StudentResponse> => POST('/users/students', body),
    },
  },
  courses: {
    create: (course: CreateCourseBody): Promise<CreateCourseResponse> => POST('/courses', course),
    update: (courseId: string, course: CreateCourseBody): Promise<CreateCourseResponse> =>
      PUT(`/courses/${courseId}`, course),
    list: (): Promise<CourseListResponse> => GET('/courses'),
    get: (courseId: string): Promise<CreateCourseResponse> => GET(`/courses/${courseId}`),
    modules: {
      list: (courseId: string): Promise<CourseModuleResponse> => GET(`/courses/${courseId}/modules`),
      get: (moduleId: string): Promise<CourseModuleResponse> => GET(`/courses/modules/${moduleId}`),
      create: (courseId: string, module: CourseModuleBody): Promise<CourseModuleResponse> =>
        POST(`/courses/${courseId}/modules`, module),
      items: {
        create: (moduleId: string, item: CourseModuleItemBody): Promise<ModuleItemResponse> =>
          POST(`/courses/modules/${moduleId}/items/`, item),
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
  reports: {
    students: {
      list: (): Promise<StudentListResponse> => GET('/reports/students'),
      get: (studentId: string): Promise<StudentResponse> => GET(`/reports/students/${studentId}`),
    },
    courseCreators: {
      list: (): Promise<CourseCreatorListResponse> => GET('/reports/teachers'),
      get: (teacherId: string): Promise<CourseCreatorResponse> => GET(`/reports/teachers/${teacherId}`),
    },
  },
};

export default Api;
