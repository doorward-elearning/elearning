import btoa from 'btoa';
import axios from 'axios';
import https from 'https';
import { environment } from '../../environments/environment';

class Api {
  static async makeRequest(method = 'post', url, data) {
    const instance = axios.create({
      headers: {
        Authorization: `Basic ${btoa(`${environment.OPENVIDU_USERNAME}:${environment.OPENVIDU_PASSWORD}`)}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    const response = await instance[method](`${environment.OPENVIDU_URL}${url}`, data);
    return response.data;
  }

  static async post(url, data) {
    return Api.makeRequest('post', url, data);
  }

  static async get(url, data) {
    return Api.makeRequest('get', url, data);
  }
}

export default Api;
