import { ModuleItemTypes } from './index';

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
