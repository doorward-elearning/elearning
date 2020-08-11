import {
  AccountDetailsBody,
  AddGroupMembersBody,
  ChangePasswordBody,
  ForumModuleBody,
  ForumModuleItemBody,
  CreateClassroomBody,
  CreateForumBody,
  CreateForumManagerBody,
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
} from './models/requestBody';
import {
  AssignmentSubmissionResponse,
  ForumListResponse,
  ForumManagerBody,
  ForumManagersBody,
  ForumModuleListResponse,
  ForumModuleResponse,
  CreateForumResponse,
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
  forums: {
    create: (forum: CreateForumBody): Promise<CreateForumResponse> => {
      return POST('/forums', forum);
    },
    update: (forumId: string, forum: CreateForumBody): Promise<CreateForumResponse> => {
      return PUT(`/forums/${forumId}`, forum);
    },
    updateModules: (forumId: string, modules: UpdateModulesBody): Promise<ForumModuleListResponse> => {
      return PUT(`/forums/${forumId}/modules`, modules);
    },
    list: (): Promise<ForumListResponse> => {
      return GET('/forums');
    },
    get: (forumId: string): Promise<CreateForumResponse> => {
      return GET(`/forums/${forumId}`);
    },
    delete: (forumId: string): Promise<ApiResponse> => {
      return DELETE(`/forums/${forumId}`);
    },
    managers: {
      create: (forumId: string, body: CreateForumManagerBody): Promise<ForumManagerBody> => {
        return POST(`/forums/${forumId}/managers/register`, body);
      },
      get: (forumId: string): Promise<ForumManagersBody> => {
        return GET(`/forums/${forumId}/managers`);
      },
    },
    room: {
      start: (forumId: string): Promise<ApiResponse> => {
        return POST(`/forums/${forumId}/room`);
      },
    },
    modules: {
      list: (forumId: string): Promise<ForumModuleResponse> => {
        return GET(`/forums/${forumId}/modules`);
      },
      get: (moduleId: string): Promise<ForumModuleResponse> => {
        return GET(`/forums/modules/${moduleId}`);
      },
      create: (forumId: string, module: ForumModuleBody): Promise<ForumModuleResponse> => {
        return POST(`/forums/${forumId}/modules`, module);
      },
      update: (moduleId: string, module: ForumModuleBody): Promise<ForumModuleResponse> => {
        return PUT(`/forums/modules/${moduleId}`, module);
      },
      items: {
        create: (moduleId: string, item: ForumModuleItemBody): Promise<ModuleItemResponse> => {
          return POST(`/forums/modules/${moduleId}/items/`, item);
        },
        list: (forumId: string, type: ModuleItemTypes): Promise<ModuleItemsResponse> => {
          return GET(`/forums/${forumId}/modules/items?type=${type}`);
        },
        get: (itemId: string): Promise<ModuleItemResponse> => {
          return GET(`/forums/modules/items/${itemId}`);
        },
        submitAssignment: (assignmentId: string, body: SubmitAssignmentBody): Promise<AssignmentSubmissionResponse> => {
          return POST(`/forums/modules/assignments/${assignmentId}/submit`, body);
        },
      },
      delete: (moduleId: string): Promise<ApiResponse> => {
        return DELETE(`/forums/modules/${moduleId}`);
      },
    },
    members: {
      get: (forumId: string): Promise<MemberListResponse> => {
        return GET(`/forums/${forumId}/members`);
      },
      create: (forumId: string, member: CreateMemberBody): Promise<MemberResponse> => {
        return POST(`/forums/${forumId}/members`, member);
      },
      notRegistered: (forumId: string, query: SearchQueryBody): Promise<MemberListResponse> => {
        return GET(`/forums/${forumId}/members/not-registered`, query);
      },
      register: (forumId: string, data: RegisterMembersBody): Promise<MemberListResponse> => {
        return POST(`/forums/${forumId}/members/register`, data);
      },
      unEnroll: (memberId: string, forumId: string): Promise<ApiResponse> => {
        return DELETE(`/forums/${forumId}/members/${memberId}`);
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
};

export default Api;
