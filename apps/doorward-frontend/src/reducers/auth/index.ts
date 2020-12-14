import { modifyReducer } from '@doorward/ui/reducers/builder';
import Tools from '@doorward/common/utils/Tools';
import { Action } from '@doorward/ui/reducers/reducers';
import ApiRequest from '@doorward/common/net/apiRequest';
import { DoorwardApiTypes } from '../../services/apis/doorward.api';
import { CLEAR_LOGIN } from './types';

const login = {
  apiMiddleware: {
    error: (): void => {
      Tools.isLoggedIn();
    },
    after: (request: any, response: any): void => {
      Tools.setToken(response.token);
      ApiRequest.setAuth();
    },
  },
  reducer: (state: any, action: Action) => {
    if (action.type === CLEAR_LOGIN) {
      return modifyReducer('data', state, action, () => {});
    } else {
      return state;
    }
  },
};

const getCurrentUser = {
  reducer: (state: any, action: Action) => {
    if (
      action.type === DoorwardApiTypes.auth.login + '_SUCCESS' ||
      action.type === DoorwardApiTypes.userProfile.updateAccountDetails + '_SUCCESS'
    ) {
      return modifyReducer('data', state, action, () => action.payload);
    }
    return state;
  },
};

export default {
  login,
  getCurrentUser,
};
