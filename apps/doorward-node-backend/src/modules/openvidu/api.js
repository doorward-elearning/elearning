import btoa from 'btoa';
import axios from 'axios';
import https from 'https';

class Api {
  static async makeRequest(method = 'post', url, data) {
    const instance = axios.create({
      headers: {
        Authorization: `Basic ${btoa(`${process.env.OPENVIDU_USERNAME}:${process.env.OPENVIDU_PASSWORD}`)}`,
        'Content-Type': 'application/json',
        Host: process.env.OPENVIDU_URL.replace('https://', '').replace('http://', ''),
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    const response = await instance[method](`${process.env.OPENVIDU_URL}${url}`, data);
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
