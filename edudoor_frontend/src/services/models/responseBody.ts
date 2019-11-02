import { ApiResponse } from '../services';
import { Course, Module, User } from './index';

export interface LoginResponse extends ApiResponse {
  token: string;
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