import {
  LoginBody,
  RegisterBody,
  UpdateAccountBody,
  UpdateProfilePictureBody,
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
  CreateOrganizationBody,
  UpdateOrganizationBody,
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
  OrganizationResponse,
  OrganizationsResponse,
  CourseManagerResponse,
  CourseManagersResponse,
  DiscussionGroupResponse,
  DiscussionGroupsResponse,
  DiscussionCommentResponse,
  AssignmentSubmissionResponse,
  AssessmentSubmissionResponse,
  AssessmentSubmissionsResponse
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

const DoorwardBackendApi = (defaultConfig ? : () => AxiosRequestConfig) => ({
  "assessments": {
    saveAssessment: (assessmentId: string, body: SaveAssessmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return POST(`/assessments/submissions/save/${assessmentId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getSubmission: (assessmentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return GET(`/assessments/submissions/${assessmentId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    submitAssignment: (assessmentId: string, body: SaveAssessmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return POST(`/assessments/submissions/submit/${assessmentId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    submitPublicAssessment: (assessmentId: string, body: SaveAssessmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return POST(`/assessments/submissions/public/submit/${assessmentId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getStudentSubmissions: (assessmentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionsResponse >> => {
      return GET(`/assessments/${assessmentId}/studentSubmissions`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getStudentSubmission: (submissionId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssessmentSubmissionResponse >> => {
      return GET(`/assessments/studentSubmission/${submissionId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "assignments": {
    submitAssignment: (assignmentId: string, body: SubmitAssignmentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < AssignmentSubmissionResponse >> => {
      return POST(`/assignments/${assignmentId}/submit`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "auth": {
    login: (body: LoginBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < LoginResponse >> => {
      return POST(`/auth/login`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    register: (body: RegisterBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < LoginResponse >> => {
      return POST(`/auth/register`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getCurrentUser: (config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return GET(`/auth`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "courseManagers": {
    createCourseManager: (courseId: string, body: AddCourseManagerBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseManagerResponse >> => {
      return POST(`/course-managers/${courseId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getCourseManagers: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseManagersResponse >> => {
      return GET(`/course-managers/${courseId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "courses": {
    createCourse: (body: CreateCourseBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseResponse >> => {
      return POST(`/courses`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
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
        ...(defaultConfig && defaultConfig())
      });
    },
    deleteCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DeleteCourseResponse >> => {
      return DELETE(`/courses/${courseId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseResponse >> => {
      return GET(`/courses/${courseId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateCourse: (courseId: string, body: UpdateCourseBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < CourseResponse >> => {
      return PUT(`/courses/${courseId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    createCourseModule: (courseId: string, body: CreateModuleBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleResponse >> => {
      return POST(`/courses/${courseId}/modules`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getCourseModules: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModulesResponse >> => {
      return GET(`/courses/${courseId}/modules`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getCourseModuleItems: (courseId: string, query ? : {
      type ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemsResponse >> => {
      return GET(`/courses/${courseId}/modules/items`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    launchClassroom: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < MeetingResponse >> => {
      return GET(`/courses/${courseId}/liveClassroom`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "discussionGroups": {
    createDiscussionGroup: (courseId: string, body: CreateDiscussionGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionGroupResponse >> => {
      return POST(`/discussion-groups/course/${courseId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getAll: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionGroupsResponse >> => {
      return GET(`/discussion-groups/course/${courseId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    postComment: (discussionGroupId: string, body: PostDiscussionCommentBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionCommentResponse >> => {
      return POST(`/discussion-groups/post/${discussionGroupId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getDiscussionGroup: (discussionGroupId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DiscussionGroupResponse >> => {
      return GET(`/discussion-groups/view/${discussionGroupId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "files": {
    createFile: (body: CreateFileBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < FileResponse >> => {
      return POST(`/files`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getFiles: (config ? : AxiosRequestConfig): Promise < AxiosResponse < FilesResponse >> => {
      return GET(`/files`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getFile: (fileId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < FileResponse >> => {
      return GET(`/files/${fileId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    uploadFile: async (
      file: Blob,
      onUploadProgress ? : (percentage: number) => void,
      cancelHandler ? : (cancelFunction: () => void) => void,
      config ? : AxiosRequestConfig
    ): Promise < AxiosResponse < FileResponse >> => {
      const formData = new FormData();

      formData.append('file', file);

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
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });

      return result;
    },
    uploadMultipleFiles: async (
      files: Array < Blob > ,
      onUploadProgress ? : (percentage: number) => void,
      cancelHandler ? : (cancelFunction: () => void) => void,
      config ? : AxiosRequestConfig
    ): Promise < AxiosResponse < FilesResponse >> => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

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
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });

      return result;
    },
  },
  "groups": {
    createGroup: (body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return POST(`/groups`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
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
        ...(defaultConfig && defaultConfig())
      });
    },
    addMemberToGroup: (groupId: string, body: AddMemberToGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return POST(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getGroup: (groupId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return GET(`/groups/${groupId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateGroup: (groupId: string, body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return PUT(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "healthCheck": {
    healthCheck: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/health-check`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "jitsi": {
    getJitsiBranding: (config ? : AxiosRequestConfig): Promise < AxiosResponse < JitsiBrandingResponse >> => {
      return GET(`/jitsi/branding`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "meetings": {
    joinMeeting: (meetingId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < MeetingResponse >> => {
      return GET(`/meetings/${meetingId}/join`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    endMeeting: (meetingId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return DELETE(`/meetings/${meetingId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    processOpenviduWebHook: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/meetings/openvidu/webhook`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "moduleItems": {
    getModuleItem: (itemId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemResponse >> => {
      return GET(`/module/items/${itemId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateModuleItem: (itemId: string, body: CreateModuleItemBody | CreateQuizBody | CreateAssignmentBody | CreatePageBody | CreateQuizBody | CreateAssessmentBody | CreateVideoBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemResponse >> => {
      return PUT(`/module/items/${itemId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "modules": {
    deleteModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < DeleteModuleResponse >> => {
      return DELETE(`/modules/${moduleId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getModule: (moduleId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleResponse >> => {
      return GET(`/modules/${moduleId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateModule: (moduleId: string, body: UpdateModuleBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleResponse >> => {
      return PUT(`/modules/${moduleId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    createModuleItem: (moduleId: string, body: CreateModuleItemBody | CreateQuizBody | CreateAssignmentBody | CreatePageBody | CreateAssessmentBody | CreateExamBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < ModuleItemResponse >> => {
      return POST(`/modules/${moduleId}/items`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateCourseModules: (body: UpdateModulesBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UpdateModulesOrderResponse >> => {
      return PUT(`/modules`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "organizations": {
    getCurrentOrganization: (config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return GET(`/organizations/current`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    createOrganization: (body: CreateOrganizationBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return POST(`/organizations`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getAllOrganizations: (config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationsResponse >> => {
      return GET(`/organizations`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getOrganization: (organizationId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return GET(`/organizations/${organizationId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateOrganization: (organizationId: string, body: UpdateOrganizationBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return PUT(`/organizations/${organizationId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "reports": {
    getStudentsReport: (config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsReportResponse >> => {
      return GET(`/reports/students`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getTeachersReport: (config ? : AxiosRequestConfig): Promise < AxiosResponse < TeachersReportResponse >> => {
      return GET(`/reports/teachers`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getStudentReport: (studentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentReportResponse >> => {
      return GET(`/reports/students/${studentId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getTeacherReport: (teacherId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < TeacherReportResponse >> => {
      return GET(`/reports/teachers/${teacherId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "resources": {
    getLocaleFile: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/resources/translations`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "schools": {
    createSchool: (body: CreateSchoolBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolResponse >> => {
      return POST(`/schools`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getAllSchools: (config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolsResponse >> => {
      return GET(`/schools`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getSchool: (schoolId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolResponse >> => {
      return GET(`/schools/${schoolId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    addClassroomToSchool: (schoolId: string, body: CreateClassroomBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < SchoolResponse >> => {
      return POST(`/schools/${schoolId}/classrooms`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
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
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "students": {
    createStudentInCourse: (courseId: string, body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return POST(`/students/course/${courseId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getStudentsInCourse: (courseId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return GET(`/students/course/${courseId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getStudentsNotRegisteredToCourse: (courseId: string, query ? : {
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return GET(`/students/course/${courseId}/not-registered`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    addStudentToCourse: (courseId: string, body: AddStudentsToCourseBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentsResponse >> => {
      return POST(`/students/course/${courseId}/register`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    unEnrollStudentFromCourse: (courseId: string, studentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return DELETE(`/students/course/${courseId}/un-enroll/${studentId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    createStudent: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return POST(`/students`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
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
        ...(defaultConfig && defaultConfig())
      });
    },
    getStudent: (studentId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return GET(`/students/${studentId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateStudent: (studentId: string, body: UpdateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < StudentResponse >> => {
      return PUT(`/students/${studentId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateStudentPassword: (studentId: string, body: ForceChangePasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/students/${studentId}/changePassword`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "teachers": {
    createTeacherAccount: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < TeacherResponse >> => {
      return POST(`/teachers`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getAllTeachers: (config ? : AxiosRequestConfig): Promise < AxiosResponse < TeachersResponse >> => {
      return GET(`/teachers`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    createFreeTrialTeacherAccount: (body: CreateUserBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < TeacherResponse >> => {
      return POST(`/teachers/freeTrial`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "userProfile": {
    getUserProfile: (username: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return GET(`/users/profile/${username}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateAccountDetails: (body: UpdateAccountBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return PUT(`/users/profile/account`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateAccountProfilePicture: (body: UpdateProfilePictureBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return PUT(`/users/profile/account/profilePicture`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateAccountPassword: (body: UpdatePasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return PUT(`/users/profile/password`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    resetAccountPassword: (body: ResetPasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/users/profile/resetPassword`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    forgotAccountPassword: (body: ForgotPasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/users/profile/forgotPassword`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  }
})

export default DoorwardBackendApi;