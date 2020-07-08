import {
  CREATE_ACCOUNT_PASSWORD,
  FORGOT_ACCOUNT_PASSWORD,
  GET_CURRENT_USER,
  UPDATE_MY_ACCOUNT_INFORMATION,
  UPDATE_MY_ACCOUNT_PASSWORD,
} from './types';
import {
  AccountDetailsBody,
  ChangePasswordBody,
  CreatePasswordBody,
  ForgotPasswordBody,
} from '../../services/models/requestBody';
import { Action } from '@doorward/ui/reducers/reducers';

export const fetchCurrentUserAction = (): Action => ({
  type: GET_CURRENT_USER,
});

export const updateAccountInformationAction = (body: AccountDetailsBody): Action => ({
  type: UPDATE_MY_ACCOUNT_INFORMATION,
  payload: [body],
});

export const updateAccountPasswordAction = (body: ChangePasswordBody): Action => ({
  type: UPDATE_MY_ACCOUNT_PASSWORD,
  payload: [body],
});

export const createAccountPasswordAction = (body: CreatePasswordBody): Action => ({
  type: CREATE_ACCOUNT_PASSWORD,
  payload: [body],
});

export const forgotAccountPasswordAction = (body: ForgotPasswordBody): Action => ({
  type: FORGOT_ACCOUNT_PASSWORD,
  payload: [body],
});
