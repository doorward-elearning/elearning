import Request from './request';
import { CreateCourseBody } from './requestBodies';

const q = require('querystring').stringify;

const { GET, PUT } = Request;

const Api = {
  users: {
    roles: {
      getRoles: (identityKey: number): Promise<any> => GET(`users/${identityKey}/roles`),
    },
    auth: {
      getAuth: (username: string): Promise<any> => GET(`users/${username}/auth`),
    },
    search: (params: object): Promise<any> => GET('users/'),
  },
  auth: {
    login: (username: string, password: string): Promise<any> => GET(`auth/${username}?${q({ password })}`),
  },
  registration: {
    register: (email: string): Promise<any> => PUT(`registration?email=${email}`),
  },
  courses: {
    create: (course: CreateCourseBody): Promise<any> => PUT('repo/courses', course),
    list: (): Promise<any> => GET('repo/courses'),
  },
};

export default Api;
