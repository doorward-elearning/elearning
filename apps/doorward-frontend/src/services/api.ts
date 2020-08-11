import {
  AccountDetailsBody,
  AddGroupMembersBody,
  ChangePasswordBody,
  CourseModuleBody,
  CourseModuleItemBody,
  CreateClassroomBody,
  CreateCourseBody,
  CreateCourseManagerBody,
  CreateGroupBody,
  CreateOrganizationBody,
  CreatePasswordBody,
  CreateMemberBody,
  CreateTeacherBody,
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
  CourseListResponse,
  CourseManagerBody,
  CourseManagersBody,
  CourseModuleListResponse,
  CourseModuleResponse,
  CreateCourseResponse,
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
  TeacherListResponse,
  TeacherResponse,
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
    teachers: {
      list: (query: string): Promise<TeacherListResponse> => {
        return GET('/users/teachers?' + query);
      },
      create: (body: CreateTeacherBody): Promise<TeacherResponse> => {
        return POST('/users/teachers', body);
      },
    },
  },
  courses: {
    create: (course: CreateCourseBody): Promise<CreateCourseResponse> => {
      return POST('/courses', course);
    },
    update: (courseId: string, course: CreateCourseBody): Promise<CreateCourseResponse> => {
      return PUT(`/courses/${courseId}`, course);
    },
    updateModules: (courseId: string, modules: UpdateModulesBody): Promise<CourseModuleListResponse> => {
      return PUT(`/courses/${courseId}/modules`, modules);
    },
    list: (): Promise<CourseListResponse> => {
      return GET('/courses');
    },
    get: (courseId: string): Promise<CreateCourseResponse> => {
      return GET(`/courses/${courseId}`);
    },
    delete: (courseId: string): Promise<ApiResponse> => {
      return DELETE(`/courses/${courseId}`);
    },
    managers: {
      create: (courseId: string, body: CreateCourseManagerBody): Promise<CourseManagerBody> => {
        return POST(`/courses/${courseId}/managers/register`, body);
      },
      get: (courseId: string): Promise<CourseManagersBody> => {
        return GET(`/courses/${courseId}/managers`);
      },
    },
    room: {
      start: (courseId: string): Promise<ApiResponse> => {
        return POST(`/courses/${courseId}/room`);
      },
    },
    modules: {
      list: (courseId: string): Promise<CourseModuleResponse> => {
        return GET(`/courses/${courseId}/modules`);
      },
      get: (moduleId: string): Promise<CourseModuleResponse> => {
        return GET(`/courses/modules/${moduleId}`);
      },
      create: (courseId: string, module: CourseModuleBody): Promise<CourseModuleResponse> => {
        return POST(`/courses/${courseId}/modules`, module);
      },
      update: (moduleId: string, module: CourseModuleBody): Promise<CourseModuleResponse> => {
        return PUT(`/courses/modules/${moduleId}`, module);
      },
      items: {
        create: (moduleId: string, item: CourseModuleItemBody): Promise<ModuleItemResponse> => {
          return POST(`/courses/modules/${moduleId}/items/`, item);
        },
        list: (courseId: string, type: ModuleItemTypes): Promise<ModuleItemsResponse> => {
          return GET(`/courses/${courseId}/modules/items?type=${type}`);
        },
        get: (itemId: string): Promise<ModuleItemResponse> => {
          return GET(`/courses/modules/items/${itemId}`);
        },
        submitAssignment: (assignmentId: string, body: SubmitAssignmentBody): Promise<AssignmentSubmissionResponse> => {
          return POST(`/courses/modules/assignments/${assignmentId}/submit`, body);
        },
      },
      delete: (moduleId: string): Promise<ApiResponse> => {
        return DELETE(`/courses/modules/${moduleId}`);
      },
    },
    members: {
      get: (courseId: string): Promise<MemberListResponse> => {
        return GET(`/courses/${courseId}/members`);
      },
      create: (courseId: string, member: CreateMemberBody): Promise<MemberResponse> => {
        return POST(`/courses/${courseId}/members`, member);
      },
      notRegistered: (courseId: string, query: SearchQueryBody): Promise<MemberListResponse> => {
        return GET(`/courses/${courseId}/members/not-registered`, query);
      },
      register: (courseId: string, data: RegisterMembersBody): Promise<MemberListResponse> => {
        return POST(`/courses/${courseId}/members/register`, data);
      },
      unEnroll: (memberId: string, courseId: string): Promise<ApiResponse> => {
        return DELETE(`/courses/${courseId}/members/${memberId}`);
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
    teachers: {
      list: (): Promise<TeacherListResponse> => {
        return GET('/reports/teachers');
      },
      get: (teacherId: string): Promise<TeacherResponse> => {
        return GET(`/reports/teachers/${teacherId}`);
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
