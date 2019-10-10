import Request from './request';

const querystring = require('querystring');

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
  registration: {
    register: (email: string): Promise<any> => PUT(`registration?email=${email}`),
  },
};

export default Api;
