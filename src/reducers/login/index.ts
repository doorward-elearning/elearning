import createReducer, { webComponentState } from '../builder';
import Api from '../../services/api';
import { Action, ApiSagaMiddleware, WebComponentState } from '../reducers';
import Tools from '../../utils/Tools';

export const LOGIN_USER = 'LOGIN_USER';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';

const sagaMiddleware: ApiSagaMiddleware = {
  error: () => {
    Tools.isLoggedIn();
  },
  after: (request, response) => {
    Tools.setToken(request[0], request[1]);
  },
};

const reducer = (state: WebComponentState, action: Action): WebComponentState => {
  if (action.type === `${LOGIN_USER}_SUCCESS`) {
    return {
      ...state,
      data: Tools.xmlToJson(action.payload, {
        attrNodeName: 'attr',
        ignoreAttributes: false,
        textNodeName: '#text',
      }),
    };
  } else if (action.type === CLEAR_LOGIN) {
    return webComponentState;
  } else {
    return state;
  }
};

export default createReducer<WebComponentState>({
  actionType: LOGIN_USER,
  endpoint: Api.auth.login,
  name: 'login',
  apiMiddleware: sagaMiddleware,
  reducer,
});
