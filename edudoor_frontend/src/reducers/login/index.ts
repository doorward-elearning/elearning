import createReducer, { modifyReducer, reducerApiAction } from '../builder';
import Api from '../../services/api';
import { Action } from '../reducers';
import Tools from '../../utils/Tools';
import { LOGIN_USER } from './types';
import Request from '../../services/request';

export const loginUser = reducerApiAction({
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
  reducer: (state, action: Action) => {
    if (action.type === 'CLEAR_LOGIN') {
      return modifyReducer('data', state, action, () => {});
    } else {
      return state;
    }
  },
});

export default createReducer({
  middleware: { loginUser },
});
