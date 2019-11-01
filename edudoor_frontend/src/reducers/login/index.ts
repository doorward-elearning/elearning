import createReducer, { webComponentState } from '../builder';
import Api from '../../services/api';
import { Action, ReduxReducerApiAction, WebComponentState } from '../reducers';
import Tools from '../../utils/Tools';
import { LOGIN_USER } from './types';
import { LoginResponse } from '../../services/models/responseBody';
import Request from '../../services/request';

export type LoginState = WebComponentState<LoginResponse>;

export const loginUser: ReduxReducerApiAction<LoginResponse> = {
  key: 'login',
  action: LOGIN_USER,
  api: Api.users.authenticate,
  apiMiddleware: {
    error: (): void => {
      Tools.isLoggedIn();
    },
    after: (request, response): void => {
      Tools.setToken(response.token);
      Request.setAuth();
    },
  },
  reducer: (state: LoginState, action: Action): LoginState => {
    if (action.type === 'CLEAR_LOGIN') {
      return webComponentState;
    } else {
      return state;
    }
  },
};

export default createReducer<LoginState>({
  middleware: [loginUser],
});
