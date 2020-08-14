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

export type ConferenceModuleBody = {
  title: string;
};

export type CreateConferenceBody = {
  title: string;
  description: string;
};

export interface CreateMemberBody {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  city: string;
  country: string;
}

export interface CreateModeratorBody extends CreateMemberBody {}

export interface ConferenceModuleItemBody {
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

export interface RegisterMembersBody {
  members: Array<string>;
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

export interface CreateConferenceManagerBody {
  managerId: string;
}

export interface PaginationBody extends PaginationQuery, ParsedUrlQuery {}

export interface SearchQueryBody extends ParsedUrlQuery {
  search?: string;
}

export interface FetchGroupQuery extends SearchQueryBody {
  type: string;
}

export interface ListMembersBody {
  notRegisteredTo?: string;
}

export interface CreatePollBody {
  title: string;
  startDate: Date;
  endDate: Date;
  choices: Array<string>;
}

export interface VotePollBody {
  optionId: string;
}

export interface CreateElectionBody {
  title: string;
  startDate: Date;
  endDate: Date;
}

export interface CreateNomineeBody {
  name: string;
  profilePicture: string;
  profile: string;
}
