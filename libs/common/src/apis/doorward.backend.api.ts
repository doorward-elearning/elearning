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
  CreateAssessmentBody,
  CreateExamBody,
  UpdateModulesBody,
  CreateVideoBody,
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
  CreateDiscussionGroupBody,
  PostDiscussionCommentBody,
  SubmitAssignmentBody,
  SaveAssessmentBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/common/net/apiRequest';
import {
  LoginResponse,
  UserResponse,
  CourseResponse,
  CoursesResponse,
  DeleteCourseResponse,
  ModuleResponse,
  ModulesResponse,
  ModuleItemsResponse,
  MeetingResponse,
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
  DiscussionGroupResponse,
  DiscussionGroupsResponse,
  DiscussionCommentResponse,
  AssignmentSubmissionResponse,
  AssessmentSubmissionResponse
} from '@doorward/common/dtos/response';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import handleApiError from '@doorward/common/net/handleApiError';
import axios, {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const DoorwardBackendApi = (defaultConfig: AxiosRequestConfig = {}) => ({
  "assessments": {
    saveAssessment: (assessmentId: string, body: SaveAssessmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return POST(`/assessments/submissions/save/${assessmentId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getSubmission: (assessmentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return GET(`/assessments/submissions/${assessmentId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    submitAssignment: (assessmentId: string, body: SaveAssessmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return POST(`/assessments/submissions/submit/${assessmentId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "assignments": {
    submitAssignment: (assignmentId: string, body: SubmitAssignmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssignmentSubmissionResponse >> => {
      return POST(`/assignments/${assignmentId}/submit`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "auth": {
    login: (body: LoginBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < LoginResponse >> => {
      return POST(`/auth/login`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    register: (body: RegisterBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < LoginResponse >> => {
      return POST(`/auth/register`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getCurrentUser: (config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return GET(`/auth`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "courseManagers": {
    createCourseManager: (courseId: string, body: AddCourseManagerBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseManagerResponse >> => {
      return POST(`/course-managers/${courseId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getCourseManagers: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseManagersResponse >> => {
      return GET(`/course-managers/${courseId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "courses": {
    createCourse: (body: CreateCourseBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseResponse >> => {
      return POST(`/courses`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getCourses: (query ? : {
      page ? : number,
      limit ? : number,
      noPagination ? : boolean
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < CoursesResponse >> => {
      return GET(`/courses`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    deleteCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DeleteCourseResponse >> => {
      return DELETE(`/courses/${courseId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseResponse >> => {
      return GET(`/courses/${courseId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateCourse: (courseId: string, body: UpdateCourseBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseResponse >> => {
      return PUT(`/courses/${courseId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    createCourseModule: (courseId: string, body: CreateModuleBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleResponse >> => {
      return POST(`/courses/${courseId}/modules`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getCourseModules: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModulesResponse >> => {
      return GET(`/courses/${courseId}/modules`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getCourseModuleItems: (courseId: string, query ? : {
      type ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemsResponse >> => {
      return GET(`/courses/${courseId}/modules/items`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    launchClassroom: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < MeetingResponse >> => {
      return GET(`/courses/${courseId}/liveClassroom`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "discussionGroups": {
    createDiscussionGroup: (courseId: string, body: CreateDiscussionGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionGroupResponse >> => {
      return POST(`/discussion-groups/course/${courseId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getAll: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionGroupsResponse >> => {
      return GET(`/discussion-groups/course/${courseId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    postComment: (discussionGroupId: string, body: PostDiscussionCommentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionCommentResponse >> => {
      return POST(`/discussion-groups/post/${discussionGroupId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getDiscussionGroup: (discussionGroupId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionGroupResponse >> => {
      return GET(`/discussion-groups/view/${discussionGroupId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "files": {
    createFile: (body: CreateFileBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < FileResponse >> => {
      return POST(`/files`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getFiles: (config ? : AxiosRequestConfig): Promise < AxiosResponse < FilesResponse >> => {
      return GET(`/files`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getFile: (fileId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < FileResponse >> => {
      return GET(`/files/${fileId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    uploadFile: async (
      file: Blob,
      onUploadProgress ? : (percentage: number) => void,
      cancelHandler ? : (cancelFunction: () => void) => void
    ): Promise < AxiosResponse < FileResponse >> => {
      const formData = new FormData();

      formData.append('file', file);

      let data = null;

      const result = await POST("/files/upload", formData, null, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelHandler(c);
        }),
      });

      return result;
    },
    uploadMultipleFiles: async (
      files: Array < Blob > ,
      onUploadProgress ? : (percentage: number) => void,
      cancelHandler ? : (cancelFunction: () => void) => void
    ): Promise < AxiosResponse < FilesResponse >> => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

      let data = null;

      const result = await POST("/files/upload/multiple", formData, null, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelHandler(c);
        }),
      });

      return result;
    },
  },
  "groups": {
    createGroup: (body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return POST(`/groups`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getGroups: (query ? : {
      type ? : string,
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupsResponse >> => {
      return GET(`/groups`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    addMemberToGroup: (groupId: string, body: AddMemberToGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return POST(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getGroup: (groupId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return GET(`/groups/${groupId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateGroup: (groupId: string, body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return PUT(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "healthCheck": {
    healthCheck: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/health-check`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "jitsi": {
    getJitsiBranding: (config ? : AxiosRequestConfig): Promise < AxiosResponse < JitsiBrandingResponse >> => {
      return GET(`/jitsi/branding`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "meetings": {
    joinMeeting: (meetingId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < MeetingResponse >> => {
      return GET(`/meetings/${meetingId}/join`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    endMeeting: (meetingId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return DELETE(`/meetings/${meetingId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    processOpenviduWebHook: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/meetings/openvidu/webhook`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "moduleItems": {
    getModuleItem: (itemId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemResponse >> => {
      return GET(`/module/items/${itemId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateModuleItem: (itemId: string, body: CreateModuleItemBody | CreateQuizBody | CreateAssignmentBody | CreatePageBody | CreateQuizBody | CreateAssessmentBody | CreateVideoBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemResponse >> => {
      return PUT(`/module/items/${itemId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "modules": {
    deleteModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DeleteModuleResponse >> => {
      return DELETE(`/modules/${moduleId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleResponse >> => {
      return GET(`/modules/${moduleId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateModule: (moduleId: string, body: UpdateModuleBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleResponse >> => {
      return PUT(`/modules/${moduleId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    createModuleItem: (moduleId: string, body: CreateModuleItemBody | CreateQuizBody | CreateAssignmentBody | CreatePageBody | CreateAssessmentBody | CreateExamBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemResponse >> => {
      return POST(`/modules/${moduleId}/items`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateCourseModules: (body: UpdateModulesBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UpdateModulesOrderResponse >> => {
      return PUT(`/modules`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "organizations": {
    getCurrentOrganization: (config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return GET(`/organizations/current`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    createOrganization: (body: CreateOrganizationBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return POST(`/organizations`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getAllOrganizations: (config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationsResponse >> => {
      return GET(`/organizations`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getOrganization: (organizationId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return GET(`/organizations/${organizationId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateOrganization: (organizationId: string, body: UpdateOrganizationBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return PUT(`/organizations/${organizationId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "reports": {
    getStudentsReport: (config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsReportResponse >> => {
      return GET(`/reports/students`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getTeachersReport: (config ? : AxiosRequestConfig): Promise < AxiosResponse < TeachersReportResponse >> => {
      return GET(`/reports/teachers`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getStudentReport: (studentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentReportResponse >> => {
      return GET(`/reports/students/${studentId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getTeacherReport: (teacherId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < TeacherReportResponse >> => {
      return GET(`/reports/teachers/${teacherId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "resources": {
    getLocaleFile: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/resources/translations`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "schools": {
    createSchool: (body: CreateSchoolBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolResponse >> => {
      return POST(`/schools`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getAllSchools: (config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolsResponse >> => {
      return GET(`/schools`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getSchool: (schoolId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolResponse >> => {
      return GET(`/schools/${schoolId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    addClassroomToSchool: (schoolId: string, body: CreateClassroomBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolResponse >> => {
      return POST(`/schools/${schoolId}/classrooms`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "searchSuggestions": {
    getSuggestions: (type: string, query ? : {
      groupType ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < SuggestionsResponse >> => {
      return GET(`/search-suggestions/${type}`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "students": {
    createStudentInCourse: (courseId: string, body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return POST(`/students/course/${courseId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getStudentsInCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return GET(`/students/course/${courseId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getStudentsNotRegisteredToCourse: (courseId: string, query ? : {
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return GET(`/students/course/${courseId}/not-registered`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    addStudentToCourse: (courseId: string, body: AddStudentsToCourseBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return POST(`/students/course/${courseId}/register`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    unEnrollStudentFromCourse: (courseId: string, studentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return DELETE(`/students/course/${courseId}/un-enroll/${studentId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    createStudent: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return POST(`/students`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getAllStudents: (query ? : {
      search ? : string,
      page ? : number,
      limit ? : number,
      noPagination ? : boolean
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return GET(`/students`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getStudent: (studentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return GET(`/students/${studentId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateStudent: (studentId: string, body: UpdateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return PUT(`/students/${studentId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateStudentPassword: (studentId: string, body: ForceChangePasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/students/${studentId}/changePassword`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "teachers": {
    createTeacherAccount: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < TeacherResponse >> => {
      return POST(`/teachers`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getAllTeachers: (config ? : AxiosRequestConfig): Promise < AxiosResponse < TeachersResponse >> => {
      return GET(`/teachers`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    createFreeTrialTeacherAccount: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < TeacherResponse >> => {
      return POST(`/teachers/freeTrial`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "userProfile": {
    getUserProfile: (username: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return GET(`/users/profile/${username}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateAccountDetails: (body: UpdateAccountBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return PUT(`/users/profile/account`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateAccountPassword: (body: UpdatePasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return PUT(`/users/profile/password`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    resetAccountPassword: (body: ResetPasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/users/profile/resetPassword`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    forgotAccountPassword: (body: ForgotPasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/users/profile/forgotPassword`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  }
})

export default DoorwardBackendApi;