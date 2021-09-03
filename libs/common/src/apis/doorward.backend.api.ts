import ApiRequest from '@doorward/common/net/apiRequest';

import DApiResponse from '@doorward/common/dtos/response/base.response';
import handleApiError from '@doorward/common/net/handleApiError';
import axios, {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const DoorwardBackendApi = (defaultConfig ? : () => AxiosRequestConfig) => ({
  "healthCheck": {
    healthCheck: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/health-check`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  }
})

export default DoorwardBackendApi;