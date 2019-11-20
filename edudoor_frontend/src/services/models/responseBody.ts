import { ApiResponse } from '../services';
import { Course, CourseCreator, Module, ModuleItem, Student, User } from './index';

export interface LoginResponse extends UserResponse {
  token: string;
}

export interface UserResponse extends ApiResponse {
  user: User;
}

export interface CreateCourseResponse extends ApiResponse {
  course: Course;
}

export interface CourseListResponse extends ApiResponse {
  courses: Array<Course>;
}

export interface CourseModuleResponse extends ApiResponse {
  module: Module;
}

export interface StudentListResponse extends ApiResponse {
  students: Array<Student>;
}

export interface StudentResponse extends ApiResponse {
  student: Student;
}

export interface ModuleItemResponse extends ApiResponse {
  item: ModuleItem;
}

export interface ModuleItemsResponse extends ApiResponse {
  items: Array<ModuleItem>;
}

export interface CourseCreatorListResponse extends ApiResponse {
  courseCreators: Array<CourseCreator>;
}
export interface CourseCreatorResponse extends ApiResponse {
  courseCreator: CourseCreator;
}
