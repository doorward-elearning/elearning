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
    create: async (course: CreateCourseBody): Promise<any> => {
      const response = await PUT('repo/courses', {
        title: course.title,
        description: course.description,
      });
      const {
        data: { key: courseId },
      } = response;
      // create modules for this course.
      response.data.modules = await Promise.all(
        course.modules.map(async module => {
          const { data } = await Api.courses.modules.create(courseId, module.name);
          return data;
        })
      );
      return response;
    },
    list: (): Promise<any> => GET('repo/courses'),
    modules: {
      create: (courseId: number, title: string): Promise<any> =>
        PUT(`repo/courses/${courseId}/elements/structure?${q({ shortTitle: title })}`),
    },
  },
};

export default Api;
