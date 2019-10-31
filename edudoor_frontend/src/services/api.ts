import Request from './request';
import { CreateCourseBody } from './models/requestBody';
import { CourseListResponse, CreateCourseResponse, LoginResponse } from './models/responseBody';

const q = require('querystring').stringify;

const { GET, PUT, POST } = Request;

const Api = {
  users: {
    authenticate: (body: { username: string; password: string }): Promise<LoginResponse> =>
      POST('users/authenticate', body),
  },
  courses: {
    create: async (course: CreateCourseBody): Promise<CreateCourseResponse> => POST('/courses', course),
    list: (): Promise<CourseListResponse> => GET('/courses'),
    get: (courseId: number): Promise<CreateCourseResponse> => GET(`/courses/${courseId}`),
  },
};

export default Api;
