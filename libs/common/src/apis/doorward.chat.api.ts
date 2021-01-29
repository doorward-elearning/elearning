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
  "chat": {
    getConversations: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/chat/conversations`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "contacts": {
    getContacts: (config ? : AxiosRequestConfig): Promise < AxiosResponse < ContactsResponse >> => {
      return GET(`/contacts`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getGroupContacts: (config ? : AxiosRequestConfig): Promise < AxiosResponse < ContactsResponse >> => {
      return GET(`/contacts/groups`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "groups": {
    createGroup: (body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return POST(`/groups`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getGroups: (query ? : {
      type ? : string,
      search ? : string
    }, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupsResponse >> => {
      return GET(`/groups`, {
        ...(query || {})
      }, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    addMemberToGroup: (groupId: string, body: AddMemberToGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return POST(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getGroup: (groupId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return GET(`/groups/${groupId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateGroup: (groupId: string, body: CreateGroupBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < GroupResponse >> => {
      return PUT(`/groups/${groupId}`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  }
})

export default DoorwardBackendApi;