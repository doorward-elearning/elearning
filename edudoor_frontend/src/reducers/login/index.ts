import createReducer, { webComponentState } from '../builder';
import Api from '../../services/api';
import { Action, ReduxReducerApiAction, WebComponentState } from '../reducers';
import Tools from '../../utils/Tools';
import { LOGIN_USER } from './types';

export const loginUser: ReduxReducerApiAction = {
  key: 'login',
  action: LOGIN_USER,
  api: Api.auth.login,
  apiMiddleware: {
    error: (): void => {
      Tools.isLoggedIn();
    },
    after: (request, response): void => {
      Tools.setToken(request[0], request[1]);
    },
  },
  reducer: (state: WebComponentState<any>, action: Action): WebComponentState<any> => {
    if (action.type === 'LOGIN_USER_SUCCESS') {
      return {
        ...state,
        data: Tools.xmlToJson(action.payload, {
          attrNodeName: 'attr',
          ignoreAttributes: false,
          textNodeName: '#text',
        }),
      };
    } else if (action.type === 'CLEAR_LOGIN') {
      return webComponentState;
    } else {
      return state;
    }
  },
};

export default createReducer<WebComponentState<any>>({
  middleware: [loginUser],
});
