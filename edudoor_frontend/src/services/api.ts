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
  UpdateModulesBody,
} from './models/requestBody';
import {
  CourseCreatorListResponse,
  CourseCreatorResponse,
  CourseListResponse,
  CourseModuleListResponse,
  CourseModuleResponse,
  CreateCourseResponse,
  LoginResponse,
  ModuleItemResponse,
  StudentListResponse,
  StudentResponse,
  UserResponse,
} from './models/responseBody';
import { ApiResponse } from './services';
import { Module } from './models';

/**
 * Use the return keyword in the functions to improve readability
 */
const q = require('querystring').stringify;

const { GET, PUT, POST } = Request;

const Api = {
  users: {
    authenticate: (body: LoginBody): Promise<LoginResponse> => {
      return POST('users/auth', body);
    },
    register: (body: RegistrationBody): Promise<LoginResponse> => {
      return POST('/users/register', body);
    },
    currentUser: (): Promise<UserResponse> => {
      return GET('/users/auth');
    },
    profile: {
      updateAccount: (body: AccountDetailsBody): Promise<UserResponse> => {
        return PUT('/users/profile/account', body);
      },
      changePassword: (body: ChangePasswordBody): Promise<ApiResponse> => {
        return PUT('/users/profile/password', body);
      },
      resetPassword: (body: CreatePasswordBody): Promise<ApiResponse> => {
        return POST('/users/profile/resetPassword', body);
      },
      forgotPassword: (body: ForgotPasswordBody): Promise<ApiResponse> => {
        return POST('/users/profile/forgotPassword', body);
      },
    },
    students: {
      list: (query: string): Promise<StudentListResponse> => {
        return GET('/users/students?' + query);
      },
      create: (body: CreateStudentBody): Promise<StudentResponse> => {
        return POST('/users/students', body);
      },
    },
  },
  courses: {
    create: (course: CreateCourseBody): Promise<CreateCourseResponse> => {
      return POST('/courses', course);
    },
    update: (courseId: string, course: CreateCourseBody): Promise<CreateCourseResponse> => {
      return PUT(`/courses/${courseId}`, course);
    },
    updateModules: (courseId: string, modules: UpdateModulesBody): Promise<CourseModuleListResponse> => {
      return PUT(`/courses/${courseId}/modules`, modules);
    },
    list: (): Promise<CourseListResponse> => {
      return GET('/courses');
    },
    get: (courseId: string): Promise<CreateCourseResponse> => {
      return GET(`/courses/${courseId}`);
    },
    modules: {
      list: (courseId: string): Promise<CourseModuleResponse> => {
        return GET(`/courses/${courseId}/modules`);
      },
      get: (moduleId: string): Promise<CourseModuleResponse> => {
        return GET(`/courses/modules/${moduleId}`);
      },
      create: (courseId: string, module: CourseModuleBody): Promise<CourseModuleResponse> => {
        return POST(`/courses/${courseId}/modules`, module);
      },
      update: (moduleId: string, module: CourseModuleBody): Promise<CourseModuleResponse> => {
        return PUT(`/courses/modules/${moduleId}`, module);
      },
      items: {
        create: (moduleId: string, item: CourseModuleItemBody): Promise<ModuleItemResponse> => {
          return POST(`/courses/modules/${moduleId}/items/`, item);
        },
      },
    },
    students: {
      get: (courseId: string): Promise<StudentListResponse> => {
        return GET(`/courses/${courseId}/students`);
      },
      create: (courseId: string, student: CreateStudentBody): Promise<StudentResponse> => {
        return POST(`/courses/${courseId}/students`, student);
      },
      notRegistered: (courseId: string): Promise<StudentListResponse> => {
        return GET(`/courses/${courseId}/students/not-registered`);
      },
    },
  },
  reports: {
    students: {
      list: (): Promise<StudentListResponse> => {
        return GET('/reports/students');
      },
      get: (studentId: string): Promise<StudentResponse> => {
        return GET(`/reports/students/${studentId}`);
      },
    },
    courseCreators: {
      list: (): Promise<CourseCreatorListResponse> => {
        return GET('/reports/teachers');
      },
      get: (teacherId: string): Promise<CourseCreatorResponse> => {
        return GET(`/reports/teachers/${teacherId}`);
      },
    },
  },
};

export default Api;
