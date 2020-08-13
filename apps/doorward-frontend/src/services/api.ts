import {
  AccountDetailsBody,
  AddGroupMembersBody,
  ChangePasswordBody,
  ConferenceModuleBody,
  ConferenceModuleItemBody,
  CreateClassroomBody,
  CreateConferenceBody,
  CreateConferenceManagerBody,
  CreateGroupBody,
  CreateOrganizationBody,
  CreatePasswordBody,
  CreateMemberBody,
  CreateModeratorBody,
  FetchGroupQuery,
  ForgotPasswordBody,
  ListMembersBody,
  LoginBody,
  PaginationBody,
  RegisterMembersBody,
  RegistrationBody,
  SearchQueryBody,
  SubmitAssignmentBody,
  UpdateGroupBody,
  UpdateModulesBody,
  CreatePollBody,
  VotePollBody,
<<<<<<< HEAD
=======
  CreateElectionBody,
  CreateNomineeBody,
>>>>>>> 46574434d00d813f9b4aa3576cdc43f4e1494efb
} from './models/requestBody';
import {
  AssignmentSubmissionResponse,
  ConferenceListResponse,
  ConferenceManagerBody,
  ConferenceManagersBody,
  ConferenceModuleListResponse,
  ConferenceModuleResponse,
  CreateConferenceResponse,
  FileUploadResponse,
  GroupResponse,
  GroupsResponse,
  LoginResponse,
  MeetingResponse,
  ModuleItemResponse,
  ModuleItemsResponse,
  OrganizationResponse,
  OrganizationsResponse,
  SchoolResponse,
  SchoolsResponse,
  MemberListResponse,
  MemberResponse,
  SuggestionsResponse,
  ModeratorListResponse,
  ModeratorResponse,
  UserResponse,
  PollResponse,
  PollsResponse,
<<<<<<< HEAD
=======
  ElectionResponse,
  ElectionsResponse,
  CloudinaryFileUploadResponse,
  NomineeResponse,
>>>>>>> 46574434d00d813f9b4aa3576cdc43f4e1494efb
} from './models/responseBody';
import ApiRequest from '@doorward/ui/services/apiRequest';
import { ModuleItemTypes } from '@doorward/common/models';
import axios from 'axios';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import { ParsedUrlQuery } from 'querystring';

/**
 * Use the return keyword in the functions to improve readability
 */

const { GET, PUT, POST, DELETE } = ApiRequest;

const Api = {
  fileURL: (fileId: string, publicFile = false) =>
    `${process.env.REACT_APP_BASE_URL}/storage${publicFile ? '/public' : ''}/files/${fileId}`,
  users: {
    authenticate: (body: LoginBody): Promise<LoginResponse> => {
      return POST('users/auth', body);
    },
    register: (body: RegistrationBody): Promise<LoginResponse> => {
      return POST('/users/register', body);
    },
    currentUser: (): Promise<UserResponse> => {
      return GET('/users/auth');
    },
    profile: {
      updateAccount: (body: AccountDetailsBody): Promise<UserResponse> => {
        return PUT('/users/profile/account', body);
      },
      changePassword: (body: ChangePasswordBody): Promise<ApiResponse> => {
        return PUT('/users/profile/password', body);
      },
      resetPassword: (body: CreatePasswordBody): Promise<ApiResponse> => {
        return POST('/users/profile/resetPassword', body);
      },
      forgotPassword: (body: ForgotPasswordBody): Promise<ApiResponse> => {
        return POST('/users/profile/forgotPassword', body);
      },
    },
    members: {
      list: (pagination?: PaginationBody, query?: ListMembersBody): Promise<MemberListResponse> => {
        return GET('/users/members', { ...(pagination || {}), ...(query || {}) });
      },
      create: (body: CreateMemberBody): Promise<MemberResponse> => {
        return POST('/users/members', body);
      },
      get: (id: string): Promise<MemberResponse> => {
        return GET(`/users/members/${id}`);
      },
      changePassword: (id: string, body: ChangePasswordBody): Promise<ApiResponse> => {
        return POST(`/users/members/${id}/changePassword`, body);
      },
      update: (id: string, body: AccountDetailsBody): Promise<MemberResponse> => {
        return PUT(`/users/members/${id}`, body);
      },
    },
    moderators: {
      list: (query: string): Promise<ModeratorListResponse> => {
        return GET('/users/moderators?' + query);
      },
      create: (body: CreateModeratorBody): Promise<ModeratorResponse> => {
        return POST('/users/moderators', body);
      },
    },
  },
<<<<<<< HEAD
  conferences: {
    create: (conference: CreateConferenceBody): Promise<CreateConferenceResponse> => {
      return POST('/conferences', conference);
    },
    update: (conferenceId: string, conference: CreateConferenceBody): Promise<CreateConferenceResponse> => {
      return PUT(`/conferences/${conferenceId}`, conference);
    },
    updateModules: (conferenceId: string, modules: UpdateModulesBody): Promise<ConferenceModuleListResponse> => {
      return PUT(`/conferences/${conferenceId}/modules`, modules);
    },
    list: (): Promise<ConferenceListResponse> => {
      return GET('/conferences');
    },
=======
  elections: {
    create: (body: CreateElectionBody): Promise<ElectionResponse> => {
      return POST('/elections', body);
    },
    list: (): Promise<ElectionsResponse> => {
      return GET('/elections');
    },
    get: (electionId: string): Promise<ElectionResponse> => {
      return GET(`/elections/${electionId}`);
    },
    createNominee: (electionId: string, body: CreateNomineeBody): Promise<NomineeResponse> => {
      return POST(`/elections/${electionId}/nominees`, body);
    },
    vote: (electionId: string, nomineeId: string): Promise<ApiResponse> => {
      return POST(`/elections/${electionId}/nominees/${nomineeId}/vote`);
    },
  },
  conferences: {
    create: (conference: CreateConferenceBody): Promise<CreateConferenceResponse> => {
      return POST('/conferences', conference);
    },
    update: (conferenceId: string, conference: CreateConferenceBody): Promise<CreateConferenceResponse> => {
      return PUT(`/conferences/${conferenceId}`, conference);
    },
    updateModules: (conferenceId: string, modules: UpdateModulesBody): Promise<ConferenceModuleListResponse> => {
      return PUT(`/conferences/${conferenceId}/modules`, modules);
    },
    list: (): Promise<ConferenceListResponse> => {
      return GET('/conferences');
    },
>>>>>>> 46574434d00d813f9b4aa3576cdc43f4e1494efb
    get: (conferenceId: string): Promise<CreateConferenceResponse> => {
      return GET(`/conferences/${conferenceId}`);
    },
    delete: (conferenceId: string): Promise<ApiResponse> => {
      return DELETE(`/conferences/${conferenceId}`);
    },
    polls: {
      create: (conferenceId: string, body: CreatePollBody): Promise<PollResponse> => {
        return POST(`/conferences/${conferenceId}/polls`, body);
      },
      list: (conferenceId: string): Promise<PollsResponse> => {
        return GET(`/conferences/${conferenceId}/polls`);
      },
      vote: (conferenceId: string, pollId: string, body: VotePollBody): Promise<ApiResponse> => {
        return POST(`/conferences/${conferenceId}/polls/${pollId}`, body);
      },
    },
    managers: {
      create: (conferenceId: string, body: CreateConferenceManagerBody): Promise<ConferenceManagerBody> => {
        return POST(`/conferences/${conferenceId}/managers/register`, body);
      },
      get: (conferenceId: string): Promise<ConferenceManagersBody> => {
        return GET(`/conferences/${conferenceId}/managers`);
      },
    },
    room: {
      start: (conferenceId: string): Promise<ApiResponse> => {
        return POST(`/conferences/${conferenceId}/room`);
      },
    },
    modules: {
      list: (conferenceId: string): Promise<ConferenceModuleResponse> => {
        return GET(`/conferences/${conferenceId}/modules`);
      },
      get: (moduleId: string): Promise<ConferenceModuleResponse> => {
        return GET(`/conferences/modules/${moduleId}`);
      },
      create: (conferenceId: string, module: ConferenceModuleBody): Promise<ConferenceModuleResponse> => {
        return POST(`/conferences/${conferenceId}/modules`, module);
      },
      update: (moduleId: string, module: ConferenceModuleBody): Promise<ConferenceModuleResponse> => {
        return PUT(`/conferences/modules/${moduleId}`, module);
      },
      items: {
        create: (moduleId: string, item: ConferenceModuleItemBody): Promise<ModuleItemResponse> => {
          return POST(`/conferences/modules/${moduleId}/items/`, item);
        },
        list: (conferenceId: string, type: ModuleItemTypes): Promise<ModuleItemsResponse> => {
          return GET(`/conferences/${conferenceId}/modules/items?type=${type}`);
        },
        get: (itemId: string): Promise<ModuleItemResponse> => {
          return GET(`/conferences/modules/items/${itemId}`);
        },
        submitAssignment: (assignmentId: string, body: SubmitAssignmentBody): Promise<AssignmentSubmissionResponse> => {
          return POST(`/conferences/modules/assignments/${assignmentId}/submit`, body);
        },
      },
      delete: (moduleId: string): Promise<ApiResponse> => {
        return DELETE(`/conferences/modules/${moduleId}`);
      },
    },
    members: {
      get: (conferenceId: string): Promise<MemberListResponse> => {
        return GET(`/conferences/${conferenceId}/members`);
      },
      create: (conferenceId: string, member: CreateMemberBody): Promise<MemberResponse> => {
        return POST(`/conferences/${conferenceId}/members`, member);
      },
      notRegistered: (conferenceId: string, query: SearchQueryBody): Promise<MemberListResponse> => {
        return GET(`/conferences/${conferenceId}/members/not-registered`, query);
      },
      register: (conferenceId: string, data: RegisterMembersBody): Promise<MemberListResponse> => {
        return POST(`/conferences/${conferenceId}/members/register`, data);
      },
      unEnroll: (memberId: string, conferenceId: string): Promise<ApiResponse> => {
        return DELETE(`/conferences/${conferenceId}/members/${memberId}`);
      },
    },
  },
  reports: {
    members: {
      list: (): Promise<MemberListResponse> => {
        return GET('/reports/members');
      },
      get: (memberId: string): Promise<MemberResponse> => {
        return GET(`/reports/members/${memberId}`);
      },
    },
    moderators: {
      list: (): Promise<ModeratorListResponse> => {
        return GET('/reports/moderators');
      },
      get: (moderatorId: string): Promise<ModeratorResponse> => {
        return GET(`/reports/moderators/${moderatorId}`);
      },
    },
  },
  meetings: {
    join: (id: string): Promise<MeetingResponse> => {
      return GET(`/meetings/${id}`);
    },
  },
  groups: {
    list: (query: FetchGroupQuery): Promise<GroupsResponse> => {
      return GET('/groups', query);
    },
    create: (body: CreateGroupBody): Promise<GroupResponse> => {
      return POST('/groups', body);
    },
    get: (id: string): Promise<GroupResponse> => {
      return GET(`/groups/${id}`);
    },
    update: (id: string, body: UpdateGroupBody): Promise<GroupResponse> => {
      return PUT(`/groups/${id}`, body);
    },
    addMembers: (groupId: string, members: AddGroupMembersBody): Promise<GroupResponse> => {
      return POST(`/groups/${groupId}`, members);
    },
  },
  organizations: {
    list: (): Promise<OrganizationsResponse> => {
      return GET('/organizations');
    },
    create: (body: CreateOrganizationBody): Promise<OrganizationResponse> => {
      return POST('/organizations', body);
    },
    update: (organizationId: string, body: CreateOrganizationBody): Promise<OrganizationResponse> => {
      return PUT(`/organizations/${organizationId}`, body);
    },
    get: (organizationId: string): Promise<OrganizationResponse> => {
      return GET(`/organizations/${organizationId}`);
    },
    getCurrent: (): Promise<OrganizationResponse> => {
      return GET('/organizations/current');
    },
  },
  schools: {
    list: (): Promise<SchoolsResponse> => {
      return GET('/schools');
    },
    get: (schoolId: string): Promise<SchoolResponse> => {
      return GET(`/schools/${schoolId}`);
    },
    classrooms: {
      create: (schoolId: string, body: CreateClassroomBody): Promise<SchoolResponse> => {
        return POST(`/schools/${schoolId}/classrooms`, body);
      },
    },
  },
  suggestions: {
    get: (type: string, query?: ParsedUrlQuery): Promise<SuggestionsResponse> => {
      return GET(`/suggestions/${type}`, query);
    },
  },
  storage: {
    upload: (
      file: Blob,
      publicFile?: boolean,
      onUploadProgress?: (percentage: number) => void,
      cancelHandler?: (cancelFunction: () => void) => void
    ): Promise<FileUploadResponse> => {
      const formData = new FormData();
      formData.append('file', file);

      const url = publicFile ? '/storage/public/upload' : '/storage/upload';
      return POST(url, formData, null, {
        onUploadProgress: progressEvent => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken(c => {
          cancelHandler(c);
        }),
      });
    },
    getFile: (fileId: string) => {
      return GET('/storage/files/' + fileId);
    },
  },
  cloudinary: {},
};

export default Api;
