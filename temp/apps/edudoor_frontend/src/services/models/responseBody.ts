import { ApiResponse } from '@edudoor/ui/src/services/services';
import { Course, Teacher, MeetingRoom, Module, ModuleItem, Student, User } from '../../../../../libs/shared/models';
import { OpenViduSessionProps } from '../../reducers/videoCall/actions';

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

export interface TeacherListResponse extends ApiResponse {
  teachers: Array<Teacher>;
}

export interface TeacherResponse extends ApiResponse {
  teacher: Teacher;
}

export interface CourseModuleListResponse extends ApiResponse {
  modules: Array<Module>;
}

export interface MeetingRoomResponse extends ApiResponse {
  meetingRoom: MeetingRoom;
}
