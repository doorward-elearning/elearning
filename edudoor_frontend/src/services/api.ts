import Request from './request';
import { CreateCourseBody } from './models/requestBody';
import { LoginResponse } from './models/responseBody';

const q = require('querystring').stringify;

const { GET, PUT, POST } = Request;

const Api = {
  users: {
    authenticate: (body: { username: string; password: string }): Promise<LoginResponse> =>
      POST('users/authenticate', body),
  },
  courses: {
    create: async (course: CreateCourseBody): Promise<any> => POST('/courses', course),
    list: (): Promise<any> => GET('/courses'),
  },
};

export default Api;
