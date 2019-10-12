import createReducer from '../builder';
import Api from '../../services/api';
import { ApiSagaMiddleware, WebComponentState } from '../reducers';
import Tools from '../../utils/Tools';

export const LOGIN_USER = 'LOGIN_USER';

const sagaMiddleware: ApiSagaMiddleware = {
  error: () => {
    Tools.isLoggedIn();
  },
};

export default createReducer<WebComponentState>({
  actionType: LOGIN_USER,
  endpoint: Api.users.search,
  name: 'login',
  apiMiddleware: sagaMiddleware,
});
