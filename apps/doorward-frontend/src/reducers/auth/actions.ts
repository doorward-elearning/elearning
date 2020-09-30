import { CLEAR_LOGIN } from './types';
import { Action } from '@doorward/ui/reducers/reducers';

export const clearLoginAction = (): Action => ({
  type: CLEAR_LOGIN,
});
