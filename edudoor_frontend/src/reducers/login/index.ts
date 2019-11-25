import createReducer, { modifyReducer, reducerApiAction } from '../builder';
import Api from '../../services/api';
import { Action } from '../reducers';
import Tools from '../../utils/Tools';
import { LOGIN_USER, REGISTER_USER } from './types';
import Request from '../../services/request';

const loginMiddleware = {
  apiMiddleware: {
    error: (): void => {
      Tools.isLoggedIn();
    },
    after: (request: any, response: any): void => {
      Tools.setToken(response.token);
      Request.setAuth();
    },
  },
  reducer: (state: any, action: Action) => {
    if (action.type === 'CLEAR_LOGIN') {
      return modifyReducer('data', state, action, () => {});
    } else {
      return state;
    }
  },
};

export const loginUser = reducerApiAction({
  action: LOGIN_USER,
  api: Api.users.authenticate,
  ...loginMiddleware,
});

const registration = reducerApiAction({
  action: REGISTER_USER,
  api: Api.users.register,
  ...loginMiddleware,
});

export default createReducer({
  middleware: { loginUser, registration },
});
