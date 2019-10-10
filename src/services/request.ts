import axios, { AxiosResponse } from 'axios';
import Tools from '../utils/Tools';

export default class Request {
  public static setBaseURL(url?: string): void {
    axios.defaults.baseURL = url;
  }

  public static setHeader(key: string, value: any): void {
    axios.defaults.headers[key] = value;
  }

  public static setAuth(): void {
    if (Tools.isLoggedIn()) {
      axios.defaults.headers['Authorization'] = `Basic ${Tools.getToken()}`;
    }
  }

  public static GET<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return axios.get(url);
  }

  public static POST<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any
  ): Promise<R> {
    return axios.post(url, data);
  }

  public static PUT<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any
  ): Promise<R> {
    return axios.put(url, data);
  }

  public static DELETE<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return axios.delete(url);
  }
}
