import { CLEAR_LOGIN, LOGIN_USER } from './types';

export const loginUserAction = (username: string, password: string) => ({
  type: LOGIN_USER,
  payload: [username, password],
});

export const clearLoginAction = () => ({
  type: CLEAR_LOGIN,
});
