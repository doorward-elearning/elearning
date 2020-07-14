import { Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

const btoa = require('btoa');

@Injectable()
export class HttpClientService {
  private options: AxiosRequestConfig = {};

  constructor() {
    this.options.headers = {
      Authorization: 'Basic ' + btoa((process.env.OPENVIDU_USERNAME + ':' + process.env.OPENVIDU_PASSWORD).trim()),
      'Content-Type': 'application/json',
    };

    // TODO: Check for certificate type or openvidu server location
    this.options.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    this.options.baseURL = process.env.OPENVIDU_URL;
  }

  public async post<T>(url: string, body: string): Promise<T> {
    const response = await axios.post<T>(url, body, this.options);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const { data } = await axios.delete<T>(url, this.options);
    return data;
  }

  public async get<T>(url: string): Promise<T> {
    const { data } = await axios.get<T>(url, this.options);
    return data;
  }
}
