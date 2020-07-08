import axios from 'axios';
import btoa from 'btoa';

const service = axios.create();

export default class ApiRequest {
  static setBaseURL(url) {
    service.defaults.baseURL = url;
  }

  static setHeader(key, value) {
    service.defaults.headers[key] = value;
  }

  static setAuth(username, password) {
    service.defaults.headers.Authorization = btoa(`${username}:${password}`);
  }

  static GET(url) {
    return service.get(url);
  }

  static POST(url, data) {
    return service.post(url, data);
  }

  static PUT(url, data) {
    return service.put(url, data);
  }

  static DELETE(url) {
    return service.delete(url);
  }
}
