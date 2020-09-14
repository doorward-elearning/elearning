import {
  LoginBody,
  RegisterBody,
  UpdateAccountBody,
  UpdatePasswordBody,
  ResetPasswordBody,
  ForgotPasswordBody,
  CreateCourseBody,
  UpdateCourseBody,
  CreateModuleBody,
  UpdateModuleBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/ui/services/apiRequest';
import {
  LoginResponse,
  UserResponse,
  CourseResponse,
  CoursesResponse,
  DeleteCourseResponse,
  ModuleResponse,
  ModulesResponse,
  ModuleItemsResponse,
  DeleteModuleResponse,
  ModuleItemResponse,
  OrganizationResponse
} from '@doorward/common/dtos/response';
import DApiResponse from '@doorward/common/dtos/response/d.api.response';
import {
  AxiosRequestConfig
} from 'axios';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const DoorwardBackendApi = {
  login: (body: LoginBody, config ? : AxiosRequestConfig): Promise < LoginResponse > => {
    return POST(`/auth/login`, body, {}, config);
  },
  register: (body: RegisterBody, config ? : AxiosRequestConfig): Promise < LoginResponse > => {
    return POST(`/auth/register`, body, {}, config);
  },
  getCurrentUser: (config ? : AxiosRequestConfig): Promise < UserResponse > => {
    return GET(`/auth`, {}, config);
  },
  updateAccountDetails: (body: UpdateAccountBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
    return PUT(`/users/profile/account`, body, {}, config);
  },
  updateAccountPassword: (body: UpdatePasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
    return PUT(`/users/profile/password`, body, {}, config);
  },
  resetAccountPassword: (body: ResetPasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
    return POST(`/users/profile/resetPassword`, body, {}, config);
  },
  forgotAccountPassword: (body: ForgotPasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
    return POST(`/users/profile/forgotPassword`, body, {}, config);
  },
  createCourse: (body: CreateCourseBody, config ? : AxiosRequestConfig): Promise < CourseResponse > => {
    return POST(`/courses`, body, {}, config);
  },
  getCourses: (config ? : AxiosRequestConfig): Promise < CoursesResponse > => {
    return GET(`/courses`, {}, config);
  },
  getCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < CourseResponse > => {
    return GET(`/courses/${courseId}`, {}, config);
  },
  deleteCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < DeleteCourseResponse > => {
    return DELETE(`/courses/${courseId}`, {}, config);
  },
  updateCourse: (courseId: string, body: UpdateCourseBody, config ? : AxiosRequestConfig): Promise < CourseResponse > => {
    return PUT(`/courses/${courseId}`, body, {}, config);
  },
  createCourseModule: (courseId: string, body: CreateModuleBody, config ? : AxiosRequestConfig): Promise < ModuleResponse > => {
    return POST(`/courses/${courseId}/modules`, body, {}, config);
  },
  getCourseModules: (courseId: string, config ? : AxiosRequestConfig): Promise < ModulesResponse > => {
    return GET(`/courses/${courseId}/modules`, {}, config);
  },
  getCourseModuleItems: (courseId: string, query: {
    type ? : string
  }, config ? : AxiosRequestConfig): Promise < ModuleItemsResponse > => {
    return GET(`/courses/${courseId}/modules/items`, {
      ...query
    }, config);
  },
  getModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < ModuleResponse > => {
    return GET(`/modules/${moduleId}`, {}, config);
  },
  deleteModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < DeleteModuleResponse > => {
    return DELETE(`/modules/${moduleId}`, {}, config);
  },
  updateModule: (moduleId: string, body: UpdateModuleBody, config ? : AxiosRequestConfig): Promise < ModuleResponse > => {
    return PUT(`/modules/${moduleId}`, body, {}, config);
  },
  createModuleItem: (moduleId: string, undefined, config ? : AxiosRequestConfig): Promise < ModuleItemResponse > => {
    return POST(`/modules/${moduleId}/items`, undefined, {}, config);
  },
  getModuleItem: (itemId: string, config ? : AxiosRequestConfig): Promise < ModuleItemResponse > => {
    return GET(`/module/items/${itemId}`, {}, config);
  },
  updateModuleItem: (itemId: string, undefined, config ? : AxiosRequestConfig): Promise < ModuleItemResponse > => {
    return PUT(`/module/items/${itemId}`, undefined, {}, config);
  },
  getOrganization: (config ? : AxiosRequestConfig): Promise < OrganizationResponse > => {
    return GET(`/organizations/current`, {}, config);
  },

}

export default DoorwardBackendApi;