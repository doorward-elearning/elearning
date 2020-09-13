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
  UpdateModuleBody,
  CreateModuleItemBody,
  CreateQuizBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/ui/services/apiRequest';
import {
  LoginResponse
} from '@doorward/common/dtos/response';
import DApiResponse from '@doorward/common/dtos/response/d.api.response';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const DoorwardBackendApi = {
  login: (body: LoginBody, ): Promise < LoginResponse > => {
    return POST(`/auth/login`, body, {});
  },
  register: (body: RegisterBody, ): Promise < DApiResponse > => {
    return POST(`/auth/register`, body, {});
  },
  getCurrentUser: (): Promise < DApiResponse > => {
    return GET(`/auth`, {});
  },
  updateAccountDetails: (body: UpdateAccountBody, ): Promise < DApiResponse > => {
    return PUT(`/users/profile/account`, body, {});
  },
  updateAccountPassword: (body: UpdatePasswordBody, ): Promise < DApiResponse > => {
    return PUT(`/users/profile/password`, body, {});
  },
  resetAccountPassword: (body: ResetPasswordBody, ): Promise < DApiResponse > => {
    return POST(`/users/profile/resetPassword`, body, {});
  },
  forgotAccountPassword: (body: ForgotPasswordBody, ): Promise < DApiResponse > => {
    return POST(`/users/profile/forgotPassword`, body, {});
  },
  createCourse: (body: CreateCourseBody, ): Promise < DApiResponse > => {
    return POST(`/courses`, body, {});
  },
  getCourses: (): Promise < DApiResponse > => {
    return GET(`/courses`, {});
  },
  getCourse: (courseId: string, ): Promise < DApiResponse > => {
    return GET(`/courses/${courseId}`, {});
  },
  deleteCourse: (courseId: string, ): Promise < DApiResponse > => {
    return DELETE(`/courses/${courseId}`, {});
  },
  updateCourse: (courseId: string, body: UpdateCourseBody, ): Promise < DApiResponse > => {
    return PUT(`/courses/${courseId}`, body, {});
  },
  createCourseModule: (courseId: string, body: CreateModuleBody, ): Promise < DApiResponse > => {
    return POST(`/courses/${courseId}/modules`, body, {});
  },
  getCourseModules: (courseId: string, ): Promise < DApiResponse > => {
    return GET(`/courses/${courseId}/modules`, {});
  },
  getCourseModuleItems: (courseId: string, type ? : string, ): Promise < DApiResponse > => {
    return GET(`/courses/${courseId}/modules/items`, {
      type
    });
  },
  getModule: (moduleId: string, ): Promise < DApiResponse > => {
    return GET(`/modules/${moduleId}`, {});
  },
  deleteModule: (moduleId: string, ): Promise < DApiResponse > => {
    return DELETE(`/modules/${moduleId}`, {});
  },
  updateModule: (moduleId: string, body: UpdateModuleBody, ): Promise < DApiResponse > => {
    return PUT(`/modules/${moduleId}`, body, {});
  },
  createModuleItem: (moduleId: string, body: CreateModuleItemBody, ): Promise < DApiResponse > => {
    return POST(`/modules/${moduleId}/items`, body, {});
  },
  createQuiz: (moduleId: string, body: CreateQuizBody, ): Promise < DApiResponse > => {
    return POST(`/modules/${moduleId}/items/quiz`, body, {});
  },
  getModuleItem: (itemId: string, ): Promise < DApiResponse > => {
    return GET(`/module/items/${itemId}`, {});
  },
  updateModuleItem: (itemId: string, body: CreateModuleItemBody, ): Promise < DApiResponse > => {
    return PUT(`/module/items/${itemId}`, body, {});
  },
  updateQuiz: (itemId: string, body: CreateQuizBody, ): Promise < DApiResponse > => {
    return PUT(`/module/items/quiz/${itemId}`, body, {});
  },
  getOrganization: (): Promise < DApiResponse > => {
    return GET(`/organizations/current`, {});
  },

}

export default DoorwardBackendApi;