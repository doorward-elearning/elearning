import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Tools from '../utils/Tools';

const service = axios.create();

service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<any> => {
  if (process.env.REACT_APP_REQUEST_DELAY) {
    return new Promise(
      (resolve): any => setTimeout(() => resolve(config), +(process.env.REACT_APP_REQUEST_DELAY || 0))
    );
  }
  return config;
});

export default class Request {
  public static setBaseURL(url?: string): void {
    service.defaults.baseURL = url;
  }

  public static setHeader(key: string, value: any): void {
    service.defaults.headers[key] = value;
  }

  public static setAuth(): void {
    if (Tools.isLoggedIn()) {
      service.defaults.headers['Authorization'] = `Bearer ${Tools.getToken()}`;
    }
  }

  public static GET<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return service.get(url);
  }

  public static POST<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    return service.post(url, data);
  }

  public static PUT<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    return service.put(url, data);
  }

  public static DELETE<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return service.delete(url);
  }
}