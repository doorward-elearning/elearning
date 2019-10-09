import Request from './request';
const querystring = require('querystring');

const Api = {
  users: {
    roles: {
      getRoles: (identityKey: number): Promise<any> => Request.get(`users/${identityKey}/roles`)
    },
    auth: {
      getAuth: (username: string): Promise<any> => Request.get(`users/${username}/auth`)
    }
  },
  registration: {
    register: (email: string): Promise<any> => Request.put(`registration?email=${email}`)
  }
};

export default Api;

