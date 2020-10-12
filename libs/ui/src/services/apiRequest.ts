import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Tools from '@doorward/common/utils/Tools';
import { ParsedUrlQuery } from 'querystring';
import * as queryString from 'querystring';
import { pickBy, identity } from 'lodash';

const service = axios.create();

service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<any> => {
  if (process.env.REACT_APP_REQUEST_DELAY) {
    return new Promise((resolve): any =>
      setTimeout(() => resolve(config), +(process.env.REACT_APP_REQUEST_DELAY || 0))
    );
  }
  return config;
});

export default class ApiRequest {
  public static setBaseURL(url = ''): void {
    service.defaults.baseURL = url;
  }

  public static createQueryUrl(url: string, query = {}) {
    const pathQuery = queryString.parse(window.location.search.replace(/^\?/, ''));

    if (pathQuery) {
      query = { ...pathQuery, ...query };
    }

    return `${url}${query ? '?' : ''}${query ? queryString.stringify(pickBy(query, identity)) : ''}`;
  }

  public static setHeader(key: string, value: any): void {
    service.defaults.headers[key] = value;
  }

  public static setAuth(): void {
    if (Tools.isLoggedIn()) {
      service.defaults.headers['Authorization'] = `Bearer ${Tools.getToken()}`;
    }
  }

  public static GET<T = any, R = AxiosResponse<T>>(
    url: string,
    query?: object,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return service.get(ApiRequest.createQueryUrl(url, query), config);
  }

  public static POST<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    query?: object,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return service.post(ApiRequest.createQueryUrl(url, query), data, config);
  }

  public static PUT<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    query?: object,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return service.put(ApiRequest.createQueryUrl(url, query), data, config);
  }

  public static DELETE<T = any, R = AxiosResponse<T>>(
    url: string,
    query?: object,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return service.delete(ApiRequest.createQueryUrl(url, query), config);
  }
}
