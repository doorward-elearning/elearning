import ApiRequest from '../utils/ApiRequest';

const { GET } = ApiRequest;

const Api = {
  auth: {
    login: (username, password) => GET(`auth/${username}?password=${password}`),
  },
};

export default Api;
