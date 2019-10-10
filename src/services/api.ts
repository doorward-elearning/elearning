import Request from './request';

const querystring = require('querystring');

const { GET, PUT } = Request;

const Api = {
  users: {
    roles: {
      getRoles: (identityKey: number) => GET(`users/${identityKey}/roles`),
    },
    auth: {
      getAuth: (username: string) => GET(`users/${username}/auth`),
    },
  },
  registration: {
    register: (email: string) => PUT(`registration?email=${email}`),
  },
};

export default Api;
