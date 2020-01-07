import { ApiResponse } from '@edudoor/ui/services/services';
import { User } from '@edudoor/common/models/User';
import { Student } from '@edudoor/common/models/Student';
import { Teacher } from '@edudoor/common/models/Teacher';
import { Module } from '@edudoor/common/models/Module';
import { ModuleItem } from '@edudoor/common/models/ModuleItem';
import { Course } from '@edudoor/common/models/Course';
import { MeetingRoom } from '@edudoor/common/models/MeetingRoom';

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
