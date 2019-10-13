import createReducer from '../builder';
import Api from '../../services/api';
import { Action, ApiSagaMiddleware, WebComponentState } from '../reducers';
import Tools from '../../utils/Tools';

export const LOGIN_USER = 'LOGIN_USER';

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
