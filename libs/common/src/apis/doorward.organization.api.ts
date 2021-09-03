import {
  CreateOrganizationBody,
  UpdateOrganizationBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/common/net/apiRequest';
import {
  OrganizationResponse,
  OrganizationsResponse
} from '@doorward/common/dtos/response';
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

const DoorwardOrganizationApi = (defaultConfig ? : () => AxiosRequestConfig) => ({
  "organizations": {
    getCurrentOrganization: (config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return GET(`/organizations/current`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    createOrganization: (body: CreateOrganizationBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return POST(`/organizations`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getAllOrganizations: (config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationsResponse >> => {
      return GET(`/organizations`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getOrganization: (organizationId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return GET(`/organizations/${organizationId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateOrganization: (organizationId: string, body: UpdateOrganizationBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < OrganizationResponse >> => {
      return PUT(`/organizations/${organizationId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  }
})

export default DoorwardOrganizationApi;