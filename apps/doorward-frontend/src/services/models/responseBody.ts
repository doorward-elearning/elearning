import { User } from '@doorward/common/models/User';
import { Member } from '@doorward/common/models/Member';
import { Moderator } from '@doorward/common/models/Moderator';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { Conference } from '@doorward/common/models/Conference';
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
import { Poll } from '@doorward/common/models/Poll';
import { Election } from '@doorward/common/models/Election';

export interface LoginResponse extends UserResponse {
  token: string;
}

export interface UserResponse extends ApiResponse {
  user: User;
}

export interface CreateConferenceResponse extends ApiResponse {
  conference: Conference;
}

export interface ConferenceListResponse extends ApiResponse {
  conferences: Array<Conference>;
}

export interface ConferenceModuleResponse extends ApiResponse {
  module: Module;
}

export interface MemberListResponse extends ApiResponse {
  members: Array<Member>;
  meta: PaginationMetaData;
}

export interface MemberResponse extends ApiResponse {
  member: Member;
}

export interface ModuleItemResponse extends ApiResponse {
  item: ModuleItem;
}

export interface ModuleItemsResponse extends ApiResponse {
  items: Array<ModuleItem>;
}

export interface ModeratorListResponse extends ApiResponse {
  moderators: Array<Moderator>;
}

export interface ModeratorResponse extends ApiResponse {
  moderator: Moderator;
}

export interface ConferenceModuleListResponse extends ApiResponse {
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

export interface ConferenceManagerBody extends ApiResponse {
  manager: User;
}

export interface ConferenceManagersBody extends ApiResponse {
  managers: Array<User>;
}

export interface SuggestionsResponse extends ApiResponse {
  suggestions: Array<SearchSuggestion>;
}

export interface PollResponse extends ApiResponse {
  poll: Poll;
}

export interface PollsResponse extends ApiResponse {
  polls: Array<Poll>;
}

export interface ElectionResponse extends ApiResponse {
  election: Election;
}

export interface ElectionsResponse extends ApiResponse {
  elections: Array<Election>;
}
