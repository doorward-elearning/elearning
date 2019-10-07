import Request from './request';
const querystring = require('querystring');

const Api = {
  users: {
    roles: {
      getRoles: (identityKey: number): Promise<any> => Request.get(`users/${identityKey}/roles`)
    }
  },
  registration: {
    register: (email: string): Promise<any> => Request.put(`registration?email=${email}`)
  }
};

export default Api;

