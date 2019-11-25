import { ModuleItemTypes } from './index';

export interface LoginBody {
  username: string;
  password: string;
}

export interface RegistrationBody extends LoginBody {
  email: string;
}

export type CourseModuleBody = {
  title: string;
};

export type CreateCourseBody = {
  title: string;
  description: string;
  modules: Array<CourseModuleBody>;
};

export interface CreateStudentBody {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  city: string;
  country: string;
}
export interface CourseModuleItemBody {
  type: ModuleItemTypes;
  content: any;
  title: string;
}

export interface AccountDetailsBody {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  username: string;
}

export interface ChangePasswordBody {
  password: string;
  newPassword: string;
}

export interface CreatePasswordBody {
  resetToken: string;
  resetTokenBuffer: string;
  password: string;
}

export interface ForgotPasswordBody {
  email: string;
}
