import { User } from '@doorward/common/models/User';
import { Student } from '@doorward/common/models/Student';
import { Teacher } from '@doorward/common/models/Teacher';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { Course } from '@doorward/common/models/Course';
import { Meeting } from '@doorward/common/models/Meeting';
import { Group } from '@doorward/common/models/Group';
import { Organization } from '@doorward/common/models/Organization';
import { File } from '@doorward/common/models/File';
import { AssignmentSubmission } from '@doorward/common/models/AssignmentSubmission';
import { School } from '@doorward/common/models/School';
import { ApiResponse, PaginationMetaData } from '@doorward/backend/interceptors/transform.interceptor';
import { SearchSuggestion } from '@doorward/common/types/api';
import { OpenviduUser } from '@doorward/common/types/openvidu';
import Capabilities from '@doorward/common/utils/Capabilities';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';

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
  meta: PaginationMetaData;
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
  user: OpenviduUser;
  capabilities: Capabilities<typeof MeetingCapabilities>;
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

export interface CourseManagerBody extends ApiResponse {
  manager: User;
}

export interface CourseManagersBody extends ApiResponse {
  managers: Array<User>;
}

export interface SuggestionsResponse extends ApiResponse {
  suggestions: Array<SearchSuggestion>;
}
