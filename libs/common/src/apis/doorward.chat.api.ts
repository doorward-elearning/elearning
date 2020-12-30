import ApiRequest from '@doorward/common/net/apiRequest';
import {
  ContactsResponse
} from '@doorward/common/dtos/response';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import handleApiError from '@doorward/common/net/handleApiError';
import axios, {
  AxiosRequestConfig
} from 'axios';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const DoorwardBackendApi = (defaultConfig: AxiosRequestConfig = {}) => ({
  "contacts": {
    getContacts: (config ? : AxiosRequestConfig): Promise < ContactsResponse > => {
      return GET(`/contacts`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  }
})

export default DoorwardBackendApi;