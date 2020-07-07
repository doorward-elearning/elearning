import { Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

const btoa = require('btoa');

@Injectable()
export class HttpClientService {
  private options: AxiosRequestConfig = {};

  public async post<T>(url: string, body: string): Promise<T> {
    this.options.headers = {
      Authorization: 'Basic ' + btoa((process.env.OPENVIDU_USERNAME + ':' + process.env.OPENVIDU_PASSWORD).trim()),
      'Content-Type': 'application/json',
    };

    // TODO: Check for certificate type or openvidu server location
    this.options.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios.post<T>(url, body, this.options);
    return response.data;
  }
}
