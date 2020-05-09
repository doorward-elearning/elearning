import { User } from '@edudoor/common/models/User';
import { Student } from '@edudoor/common/models/Student';
import { Teacher } from '@edudoor/common/models/Teacher';
import { Module } from '@edudoor/common/models/Module';
import { ModuleItem } from '@edudoor/common/models/ModuleItem';
import { Course } from '@edudoor/common/models/Course';
import { Meeting } from '@edudoor/common/models/Meeting';
import { Group } from '@edudoor/common/models/Group';
import { Organization } from '@edudoor/common/models/Organization';
import { File } from '@edudoor/common/models/File';
import { AssignmentSubmission } from '@edudoor/common/models/AssignmentSubmission';
import { School } from '@edudoor/common/models/School';
import { ApiResponse } from '@edudoor/backend/interceptors/transform.interceptor';

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

export interface MeetingResponse extends ApiResponse {
  meeting: Meeting;
}

export interface GroupResponse extends ApiResponse {
  group: Group;
}

export interface GroupsResponse extends ApiResponse {
  groups: Array<Group>;
}

export interface OrganizationsResponse extends ApiResponse {
  organizations: Array<Organization>;
}

export interface OrganizationResponse extends ApiResponse {
  organization: Organization;
}

export interface FileUploadResponse extends ApiResponse {
  file: File;
}

export interface AssignmentSubmissionResponse extends ApiResponse {
  submission: AssignmentSubmission;
}

export interface SchoolResponse extends ApiResponse {
  school: School;
}

export interface SchoolsResponse extends ApiResponse {
  schools: Array<School>;
}
