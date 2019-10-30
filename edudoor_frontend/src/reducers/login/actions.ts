import { CLEAR_LOGIN, LOGIN_USER } from './types';
import { Action } from '../reducers';

export const loginUserAction = (data: { username: string; password: string }): Action => ({
  type: LOGIN_USER,
  payload: data,
});

export const clearLoginAction = (): Action => ({
  type: CLEAR_LOGIN,
});
