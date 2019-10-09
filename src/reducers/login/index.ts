import reducerBuilder from '../builder';
import { WebComponentState } from '../../types';
import Api from '../../services/api';

export const LOGIN_USER = 'LOGIN_USER';


export default reducerBuilder<WebComponentState>({
  actionType: LOGIN_USER,
  endpoint: Api.users.auth.getAuth
});
