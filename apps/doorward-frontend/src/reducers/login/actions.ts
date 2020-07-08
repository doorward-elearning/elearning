import { CLEAR_LOGIN, LOGIN_USER, REGISTER_USER } from './types';
import { RegistrationBody } from '../../services/models/requestBody';
import { Action } from '@doorward/ui/reducers/reducers';

export const loginUserAction = (data: { username: string; password: string }): Action => ({
  type: LOGIN_USER,
  payload: data,
});

export const clearLoginAction = (): Action => ({
  type: CLEAR_LOGIN,
});

export const registerUserAction = (data: RegistrationBody): Action => ({
  type: REGISTER_USER,
  payload: [data],
});
