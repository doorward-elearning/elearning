import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class Request {
  public static setBaseURL(url?: string): void {
    axios.defaults.baseURL = url;
  }

  public static setHeader(key: string, value: any): void{
    // axios.defaults.headers[key] = value;
  }

  public static setAuth(username: string, password: string): void{
    axios.defaults.headers['Authorization'] = `Basic ${btoa(username+':'+password)}`;
  }

  public static get<T = any, R = AxiosResponse<T>>(url: string): Promise<R>{
    return axios.get(url, { withCredentials: true });
  }

  public static post<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R>{
    return axios.post(url, data, { withCredentials: true });
  }

  public static put<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R>{
    return axios.put(url, data, { withCredentials: true });
  }

  public static delete<T = any, R = AxiosResponse<T>>(url: string): Promise<R>{
    return axios.delete(url, { withCredentials : true});
  }
}
