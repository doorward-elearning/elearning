import { Module } from '@doorward/common/models/Module';
import { AssignmentSubmissionType, ModuleItemTypes } from '@doorward/common/models';
import { PaginationQuery } from '@doorward/common/types/api';
import { ParsedUrlQuery } from 'querystring';

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

export interface CreateTeacherBody extends CreateStudentBody {}

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
  username: string;
}

export interface UpdateModulesBody {
  modules: Array<Module>;
}

export interface RegisterStudentsBody {
  students: Array<string>;
}

export interface AddGroupMembersBody {
  members: Array<string>;
}

export interface UpdateGroupBody extends AddGroupMembersBody {
  name: string;
}

export interface CreateGroupBody extends UpdateGroupBody {
  type: string;
}

export interface CreateOrganizationBody {
  name: string;
  icon: string;
  description: string;
}

export interface SubmitAssignmentBody {
  submissionType: AssignmentSubmissionType;
  submission: string;
  resubmission: boolean;
}

export interface CreateClassroomBody {
  name: string;
}

export interface CreateCourseManagerBody {
  managerId: string;
}

export interface PaginationBody extends PaginationQuery, ParsedUrlQuery {}

export interface SearchQueryBody extends ParsedUrlQuery {
  search?: string;
}

export interface FetchGroupQuery extends SearchQueryBody {
  type: string;
}

export interface ListStudentsBody {
  notRegisteredTo?: string;
}
