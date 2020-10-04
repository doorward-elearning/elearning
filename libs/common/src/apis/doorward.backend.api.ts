import {
  LoginBody,
  RegisterBody,
  UpdateAccountBody,
  UpdatePasswordBody,
  ResetPasswordBody,
  ForgotPasswordBody,
  CreateCourseBody,
  UpdateCourseBody,
  CreateModuleBody,
  UpdateModuleBody,
  CreateModuleItemBody,
  CreateQuizBody,
  CreateAssignmentBody,
  CreatePageBody,
  UpdateModulesBody,
  CreateOrganizationBody,
  UpdateOrganizationBody,
  CreateUserBody,
  AddStudentsToCourseBody,
  UpdateUserBody,
  ForceChangePasswordBody,
  CreateGroupBody,
  AddMemberToGroupBody,
  OpenviduWebHookBody,
  CreateSchoolBody,
  CreateClassroomBody,
  CreateFileBody,
  AddCourseManagerBody,
  SubmitAssignmentBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/ui/services/apiRequest';
import {
  LoginResponse,
  UserResponse,
  CourseResponse,
  CoursesResponse,
  DeleteCourseResponse,
  ModuleResponse,
  ModulesResponse,
  ModuleItemsResponse,
  DeleteModuleResponse,
  ModuleItemResponse,
  UpdateModulesOrderResponse,
  OrganizationResponse,
  OrganizationsResponse,
  StudentResponse,
  StudentsResponse,
  GroupResponse,
  GroupsResponse,
  JitsiBrandingResponse,
  MeetingResponse,
  StudentsReportResponse,
  TeachersReportResponse,
  StudentReportResponse,
  TeacherReportResponse,
  SchoolResponse,
  SchoolsResponse,
  FileResponse,
  FilesResponse,
  SuggestionsResponse,
  TeacherResponse,
  TeachersResponse,
  CourseManagerResponse,
  CourseManagersResponse,
  DiscussionGroupsResponse,
  AssignmentSubmissionResponse
} from '@doorward/common/dtos/response';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import {
  AxiosRequestConfig
} from 'axios';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const DoorwardBackendApi = {
  "assignments": {
    submitAssignment: (assignmentId: string, body: SubmitAssignmentBody, config ? : AxiosRequestConfig): Promise < AssignmentSubmissionResponse > => {
      return POST(`/assignments/${assignmentId}/submit`, body, {}, config);
    },
  },
  "auth": {
    login: (body: LoginBody, config ? : AxiosRequestConfig): Promise < LoginResponse > => {
      return POST(`/auth/login`, body, {}, config);
    },
    register: (body: RegisterBody, config ? : AxiosRequestConfig): Promise < LoginResponse > => {
      return POST(`/auth/register`, body, {}, config);
    },
    getCurrentUser: (config ? : AxiosRequestConfig): Promise < UserResponse > => {
      return GET(`/auth`, {}, config);
    },
  },
  "courseManagers": {
    createCourseManager: (courseId: string, body: AddCourseManagerBody, config ? : AxiosRequestConfig): Promise < CourseManagerResponse > => {
      return POST(`/course-managers/${courseId}`, body, {}, config);
    },
    getCourseManagers: (courseId: string, config ? : AxiosRequestConfig): Promise < CourseManagersResponse > => {
      return GET(`/course-managers/${courseId}`, {}, config);
    },
  },
  "courses": {
    createCourse: (body: CreateCourseBody, config ? : AxiosRequestConfig): Promise < CourseResponse > => {
      return POST(`/courses`, body, {}, config);
    },
    getCourses: (config ? : AxiosRequestConfig): Promise < CoursesResponse > => {
      return GET(`/courses`, {}, config);
    },
    deleteCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < DeleteCourseResponse > => {
      return DELETE(`/courses/${courseId}`, {}, config);
    },
    getCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < CourseResponse > => {
      return GET(`/courses/${courseId}`, {}, config);
    },
    updateCourse: (courseId: string, body: UpdateCourseBody, config ? : AxiosRequestConfig): Promise < CourseResponse > => {
      return PUT(`/courses/${courseId}`, body, {}, config);
    },
    createCourseModule: (courseId: string, body: CreateModuleBody, config ? : AxiosRequestConfig): Promise < ModuleResponse > => {
      return POST(`/courses/${courseId}/modules`, body, {}, config);
    },
    getCourseModules: (courseId: string, config ? : AxiosRequestConfig): Promise < ModulesResponse > => {
      return GET(`/courses/${courseId}/modules`, {}, config);
    },
    getCourseModuleItems: (courseId: string, query: {
      type ? : string
    }, config ? : AxiosRequestConfig): Promise < ModuleItemsResponse > => {
      return GET(`/courses/${courseId}/modules/items`, {
        ...query
      }, config);
    },
  },
  "discussionGroups": {
    getAll: (courseId: string, config ? : AxiosRequestConfig): Promise < DiscussionGroupsResponse > => {
      return GET(`/discussion-groups/${courseId}`, {}, config);
    },
  },
  "files": {
    createFile: (body: CreateFileBody, config ? : AxiosRequestConfig): Promise < FileResponse > => {
      return POST(`/files`, body, {}, config);
    },
    getFiles: (config ? : AxiosRequestConfig): Promise < FilesResponse > => {
      return GET(`/files`, {}, config);
    },
    getFile: (fileId: string, config ? : AxiosRequestConfig): Promise < FileResponse > => {
      return GET(`/files/${fileId}`, {}, config);
    },
  },
  "groups": {
    createGroup: (body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return POST(`/groups`, body, {}, config);
    },
    getGroups: (query: {
      type ? : string,
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < GroupsResponse > => {
      return GET(`/groups`, {
        ...query
      }, config);
    },
    addMemberToGroup: (groupId: string, body: AddMemberToGroupBody, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return POST(`/groups/${groupId}`, body, {}, config);
    },
    getGroup: (groupId: string, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return GET(`/groups/${groupId}`, {}, config);
    },
    updateGroup: (groupId: string, body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return PUT(`/groups/${groupId}`, body, {}, config);
    },
  },
  "healthCheck": {
    healthCheck: (config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return GET(`/health-check`, {}, config);
    },
  },
  "jitsi": {
    getJitsiBranding: (config ? : AxiosRequestConfig): Promise < JitsiBrandingResponse > => {
      return GET(`/jitsi/branding`, {}, config);
    },
  },
  "meetings": {
    joinMeeting: (meetingId: string, config ? : AxiosRequestConfig): Promise < MeetingResponse > => {
      return GET(`/meetings/${meetingId}/join`, {}, config);
    },
    processOpenviduWebHook: (config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return GET(`/meetings/openvidu/webhook`, {}, config);
    },
  },
  "moduleItems": {
    getModuleItem: (itemId: string, config ? : AxiosRequestConfig): Promise < ModuleItemResponse > => {
      return GET(`/module/items/${itemId}`, {}, config);
    },
    updateModuleItem: (itemId: string, body: CreateModuleItemBody | CreateQuizBody | CreateAssignmentBody | CreatePageBody, config ? : AxiosRequestConfig): Promise < ModuleItemResponse > => {
      return PUT(`/module/items/${itemId}`, body, {}, config);
    },
  },
  "modules": {
    deleteModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < DeleteModuleResponse > => {
      return DELETE(`/modules/${moduleId}`, {}, config);
    },
    getModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < ModuleResponse > => {
      return GET(`/modules/${moduleId}`, {}, config);
    },
    updateModule: (moduleId: string, body: UpdateModuleBody, config ? : AxiosRequestConfig): Promise < ModuleResponse > => {
      return PUT(`/modules/${moduleId}`, body, {}, config);
    },
    createModuleItem: (moduleId: string, body: CreateModuleItemBody | CreateQuizBody | CreateAssignmentBody | CreatePageBody, config ? : AxiosRequestConfig): Promise < ModuleItemResponse > => {
      return POST(`/modules/${moduleId}/items`, body, {}, config);
    },
    updateCourseModules: (body: UpdateModulesBody, config ? : AxiosRequestConfig): Promise < UpdateModulesOrderResponse > => {
      return PUT(`/modules`, body, {}, config);
    },
  },
  "organizations": {
    getCurrentOrganization: (config ? : AxiosRequestConfig): Promise < OrganizationResponse > => {
      return GET(`/organizations/current`, {}, config);
    },
    createOrganization: (body: CreateOrganizationBody, config ? : AxiosRequestConfig): Promise < OrganizationResponse > => {
      return POST(`/organizations`, body, {}, config);
    },
    getAllOrganizations: (config ? : AxiosRequestConfig): Promise < OrganizationsResponse > => {
      return GET(`/organizations`, {}, config);
    },
    getOrganization: (organizationId: string, config ? : AxiosRequestConfig): Promise < OrganizationResponse > => {
      return GET(`/organizations/${organizationId}`, {}, config);
    },
    updateOrganization: (organizationId: string, body: UpdateOrganizationBody, config ? : AxiosRequestConfig): Promise < OrganizationResponse > => {
      return PUT(`/organizations/${organizationId}`, body, {}, config);
    },
  },
  "reports": {
    getStudentsReport: (config ? : AxiosRequestConfig): Promise < StudentsReportResponse > => {
      return GET(`/reports/students`, {}, config);
    },
    getTeachersReport: (config ? : AxiosRequestConfig): Promise < TeachersReportResponse > => {
      return GET(`/reports/teachers`, {}, config);
    },
    getStudentReport: (studentId: string, config ? : AxiosRequestConfig): Promise < StudentReportResponse > => {
      return GET(`/reports/students/${studentId}`, {}, config);
    },
    getTeacherReport: (teacherId: string, config ? : AxiosRequestConfig): Promise < TeacherReportResponse > => {
      return GET(`/reports/teachers/${teacherId}`, {}, config);
    },
  },
  "schools": {
    createSchool: (body: CreateSchoolBody, config ? : AxiosRequestConfig): Promise < SchoolResponse > => {
      return POST(`/schools`, body, {}, config);
    },
    getAllSchools: (config ? : AxiosRequestConfig): Promise < SchoolsResponse > => {
      return GET(`/schools`, {}, config);
    },
    getSchool: (schoolId: string, config ? : AxiosRequestConfig): Promise < SchoolResponse > => {
      return GET(`/schools/${schoolId}`, {}, config);
    },
    addClassroomToSchool: (schoolId: string, body: CreateClassroomBody, config ? : AxiosRequestConfig): Promise < SchoolResponse > => {
      return POST(`/schools/${schoolId}/classrooms`, body, {}, config);
    },
  },
  "searchSuggestions": {
    getSuggestions: (type: string, query: {
      groupType ? : string
    }, config ? : AxiosRequestConfig): Promise < SuggestionsResponse > => {
      return GET(`/search-suggestions/${type}`, {
        ...query
      }, config);
    },
  },
  "students": {
    createStudentInCourse: (courseId: string, body: CreateUserBody, config ? : AxiosRequestConfig): Promise < StudentResponse > => {
      return POST(`/students/course/${courseId}`, body, {}, config);
    },
    getStudentsInCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < StudentsResponse > => {
      return GET(`/students/course/${courseId}`, {}, config);
    },
    getStudentsNotRegisteredToCourse: (courseId: string, query: {
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < StudentsResponse > => {
      return GET(`/students/course/${courseId}/not-registered`, {
        ...query
      }, config);
    },
    addStudentToCourse: (courseId: string, body: AddStudentsToCourseBody, config ? : AxiosRequestConfig): Promise < StudentsResponse > => {
      return POST(`/students/course/${courseId}/register`, body, {}, config);
    },
    unEnrollStudentFromCourse: (courseId: string, studentId: string, config ? : AxiosRequestConfig): Promise < StudentResponse > => {
      return DELETE(`/students/course/${courseId}/un-enroll/${studentId}`, {}, config);
    },
    createStudent: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < StudentResponse > => {
      return POST(`/students`, body, {}, config);
    },
    getAllStudents: (query: {
      search ? : string,
      page ? : string
    }, config ? : AxiosRequestConfig): Promise < StudentsResponse > => {
      return GET(`/students`, {
        ...query
      }, config);
    },
    getStudent: (studentId: string, config ? : AxiosRequestConfig): Promise < StudentResponse > => {
      return GET(`/students/${studentId}`, {}, config);
    },
    updateStudent: (studentId: string, body: UpdateUserBody, config ? : AxiosRequestConfig): Promise < StudentResponse > => {
      return PUT(`/students/${studentId}`, body, {}, config);
    },
    updateStudentPassword: (studentId: string, body: ForceChangePasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return POST(`/students/${studentId}/changePassword`, body, {}, config);
    },
  },
  "teachers": {
    createTeacherAccount: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < TeacherResponse > => {
      return POST(`/teachers`, body, {}, config);
    },
    getAllTeachers: (config ? : AxiosRequestConfig): Promise < TeachersResponse > => {
      return GET(`/teachers`, {}, config);
    },
    createFreeTrialTeacherAccount: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < TeacherResponse > => {
      return POST(`/teachers/freeTrial`, body, {}, config);
    },
  },
  "userProfile": {
    updateAccountDetails: (body: UpdateAccountBody, config ? : AxiosRequestConfig): Promise < UserResponse > => {
      return PUT(`/users/profile/account`, body, {}, config);
    },
    updateAccountPassword: (body: UpdatePasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return PUT(`/users/profile/password`, body, {}, config);
    },
    resetAccountPassword: (body: ResetPasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return POST(`/users/profile/resetPassword`, body, {}, config);
    },
    forgotAccountPassword: (body: ForgotPasswordBody, config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return POST(`/users/profile/forgotPassword`, body, {}, config);
    },
  }
}

export default DoorwardBackendApi;