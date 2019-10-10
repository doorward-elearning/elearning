import createReducer from '../builder';
import Api from '../../services/api';
import { WebComponentState } from '../reducers';

export const LOGIN_USER = 'LOGIN_USER';

export default createReducer<WebComponentState>({
  actionType: LOGIN_USER,
  endpoint: Api.users.auth.getAuth,
  name: 'login',
});
