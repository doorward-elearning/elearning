import Api from '../../services/api';
import { LOGIN_USER, REGISTER_USER } from './types';
import reducerBuilder, {
  modifyReducer,
  reducerApiAction
} from '@doorward/ui/reducers/builder';
import Tools from '@doorward/common/utils/Tools';
import { Action } from '@doorward/ui/reducers/reducers';
import ApiRequest from '@doorward/ui/services/apiRequest';

const loginMiddleware = {
  apiMiddleware: {
    error: (): void => {
      Tools.isLoggedIn();
    },
    after: (request: any, response: any): void => {
      Tools.setToken(response.token);
      ApiRequest.setAuth();
    }
  },
  reducer: (state: any, action: Action) => {
    if (action.type === 'CLEAR_LOGIN') {
      return modifyReducer('data', state, action, () => {});
    } else {
      return state;
    }
  }
};

export const loginUser = reducerApiAction({
  action: LOGIN_USER,
  api: Api.users.authenticate,
  ...loginMiddleware
});

const registration = reducerApiAction({
  action: REGISTER_USER,
  api: Api.users.register,
  ...loginMiddleware
});

export default reducerBuilder({
  middleware: { loginUser, registration }
});