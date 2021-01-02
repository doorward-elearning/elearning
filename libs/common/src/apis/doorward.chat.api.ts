import {
  CreateGroupBody,
  AddMemberToGroupBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/common/net/apiRequest';
import {
  ContactsResponse,
  GroupResponse,
  GroupsResponse
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
  "chat": {
    getConversations: (config ? : AxiosRequestConfig): Promise < DApiResponse > => {
      return GET(`/chat/conversations`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "contacts": {
    getContacts: (config ? : AxiosRequestConfig): Promise < ContactsResponse > => {
      return GET(`/contacts`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  },
  "groups": {
    createGroup: (body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return POST(`/groups`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getGroups: (query ? : {
      type ? : string,
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < GroupsResponse > => {
      return GET(`/groups`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    addMemberToGroup: (groupId: string, body: AddMemberToGroupBody, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return POST(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    getGroup: (groupId: string, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return GET(`/groups/${groupId}`, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
    updateGroup: (groupId: string, body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < GroupResponse > => {
      return PUT(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...defaultConfig
      });
    },
  }
})

export default DoorwardBackendApi;