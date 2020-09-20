import {
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
  ForgotPasswordBody,
  CreateCourseBody,
  UpdateCourseBody,
  CreateModuleBody,
  UpdateAccountBody,
  UpdatePasswordBody,
  UpdateModuleBody,
  CreateUserBody,
  CreateModuleItemBody,
  CreateQuizBody,
  AddStudentsToCourseBody,
  AddCourseManagerBody,
  UpdateModulesBody,
  SubmitAssignmentBody,
  CreateGroupBody,
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/ui/services/apiRequest';
import DApiResponse, {
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
  UpdateModulesOrderResponse,
  OrganizationResponse,
  StudentResponse,
  StudentsResponse,
  CourseManagerResponse,
  CourseManagersResponse,
  AssignmentSubmissionResponse,
} from '@doorward/common/dtos/response';
import { AxiosRequestConfig } from 'axios';

const { GET, PUT, POST, DELETE } = ApiRequest;

const DoorwardBackendApi = {
  login: (body: LoginBody, config?: AxiosRequestConfig): Promise<LoginResponse> => {
    return POST(`/auth/login`, body, {}, config);
  },
  register: (body: RegisterBody, config?: AxiosRequestConfig): Promise<LoginResponse> => {
    return POST(`/auth/register`, body, {}, config);
  },
  getCurrentUser: (config?: AxiosRequestConfig): Promise<UserResponse> => {
    return GET(`/auth`, {}, config);
  },
  updateAccountDetails: (body: UpdateAccountBody, config?: AxiosRequestConfig): Promise<UserResponse> => {
    return PUT(`/users/profile/account`, body, {}, config);
  },
  updateAccountPassword: (body: UpdatePasswordBody, config?: AxiosRequestConfig): Promise<DApiResponse> => {
    return PUT(`/users/profile/password`, body, {}, config);
  },
  resetAccountPassword: (body: ResetPasswordBody, config?: AxiosRequestConfig): Promise<DApiResponse> => {
    return POST(`/users/profile/resetPassword`, body, {}, config);
  },
  forgotAccountPassword: (body: ForgotPasswordBody, config?: AxiosRequestConfig): Promise<DApiResponse> => {
    return POST(`/users/profile/forgotPassword`, body, {}, config);
  },
  createCourse: (body: CreateCourseBody, config?: AxiosRequestConfig): Promise<CourseResponse> => {
    return POST(`/courses`, body, {}, config);
  },
  getCourses: (config?: AxiosRequestConfig): Promise<CoursesResponse> => {
    return GET(`/courses`, {}, config);
  },
  getCourse: (courseId: string, config?: AxiosRequestConfig): Promise<CourseResponse> => {
    return GET(`/courses/${courseId}`, {}, config);
  },
  deleteCourse: (courseId: string, config?: AxiosRequestConfig): Promise<DeleteCourseResponse> => {
    return DELETE(`/courses/${courseId}`, {}, config);
  },
  updateCourse: (courseId: string, body: UpdateCourseBody, config?: AxiosRequestConfig): Promise<CourseResponse> => {
    return PUT(`/courses/${courseId}`, body, {}, config);
  },
  createCourseModule: (
    courseId: string,
    body: CreateModuleBody,
    config?: AxiosRequestConfig
  ): Promise<ModuleResponse> => {
    return POST(`/courses/${courseId}/modules`, body, {}, config);
  },
  getCourseModules: (courseId: string, config?: AxiosRequestConfig): Promise<ModulesResponse> => {
    return GET(`/courses/${courseId}/modules`, {}, config);
  },
  getCourseModuleItems: (
    courseId: string,
    query: {
      type?: string;
    },
    config?: AxiosRequestConfig
  ): Promise<ModuleItemsResponse> => {
    return GET(
      `/courses/${courseId}/modules/items`,
      {
        ...query,
      },
      config
    );
  },
  getModule: (moduleId: string, config?: AxiosRequestConfig): Promise<ModuleResponse> => {
    return GET(`/modules/${moduleId}`, {}, config);
  },
  deleteModule: (moduleId: string, config?: AxiosRequestConfig): Promise<DeleteModuleResponse> => {
    return DELETE(`/modules/${moduleId}`, {}, config);
  },
  updateModule: (moduleId: string, body: UpdateModuleBody, config?: AxiosRequestConfig): Promise<ModuleResponse> => {
    return PUT(`/modules/${moduleId}`, body, {}, config);
  },
  createModuleItem: (
    moduleId: string,
    body: CreateModuleItemBody | CreateQuizBody,
    config?: AxiosRequestConfig
  ): Promise<ModuleItemResponse> => {
    return POST(`/modules/${moduleId}/items`, body, {}, config);
  },
  updateCourseModules: (body: UpdateModulesBody, config?: AxiosRequestConfig): Promise<UpdateModulesOrderResponse> => {
    return PUT(`/modules`, body, {}, config);
  },
  getModuleItem: (itemId: string, config?: AxiosRequestConfig): Promise<ModuleItemResponse> => {
    return GET(`/module/items/${itemId}`, {}, config);
  },
  updateModuleItem: (
    itemId: string,
    body: CreateModuleItemBody | CreateQuizBody,
    config?: AxiosRequestConfig
  ): Promise<ModuleItemResponse> => {
    return PUT(`/module/items/${itemId}`, body, {}, config);
  },
  getOrganization: (config?: AxiosRequestConfig): Promise<OrganizationResponse> => {
    return GET(`/organizations/current`, {}, config);
  },
  createStudentInCourse: (
    courseId: string,
    body: CreateUserBody,
    config?: AxiosRequestConfig
  ): Promise<StudentResponse> => {
    return POST(`/students/course/${courseId}`, body, {}, config);
  },
  getStudentsInCourse: (courseId: string, config?: AxiosRequestConfig): Promise<StudentsResponse> => {
    return GET(`/students/course/${courseId}`, {}, config);
  },
  getStudentsNotRegisteredToCourse: (
    courseId: string,
    query: {
      search?: string;
    },
    config?: AxiosRequestConfig
  ): Promise<StudentsResponse> => {
    return GET(
      `/students/course/${courseId}/not-registered`,
      {
        ...query,
      },
      config
    );
  },
  addStudentToCourse: (
    courseId: string,
    body: AddStudentsToCourseBody,
    config?: AxiosRequestConfig
  ): Promise<StudentsResponse> => {
    return POST(`/students/course/${courseId}/register`, body, {}, config);
  },
  unEnrollStudentFromCourse: (
    courseId: string,
    studentId: string,
    config?: AxiosRequestConfig
  ): Promise<StudentResponse> => {
    return DELETE(`/students/course/${courseId}/un-enroll/${studentId}`, {}, config);
  },
  createGroup: (body: CreateGroupBody, config?: AxiosRequestConfig): Promise<DApiResponse> => {
    return POST(`/groups`, body, {}, config);
  },
  createCourseManager: (
    courseId: string,
    body: AddCourseManagerBody,
    config?: AxiosRequestConfig
  ): Promise<CourseManagerResponse> => {
    return POST(`/course-managers/${courseId}`, body, {}, config);
  },
  getCourseManagers: (courseId: string, config?: AxiosRequestConfig): Promise<CourseManagersResponse> => {
    return GET(`/course-managers/${courseId}`, {}, config);
  },
  submitAssignment: (
    assignmentId: string,
    body: SubmitAssignmentBody,
    config?: AxiosRequestConfig
  ): Promise<AssignmentSubmissionResponse> => {
    return POST(`/assignments/${assignmentId}/submit`, body, {}, config);
  },
};

export default DoorwardBackendApi;
