import reducerBuilder, { reducerApiAction } from '../../../../../libs/ui/reducers/builder';
import {
  CREATE_ACCOUNT_PASSWORD,
  FORGOT_ACCOUNT_PASSWORD,
  GET_CURRENT_USER,
  UPDATE_ACCOUNT_INFORMATION,
  UPDATE_ACCOUNT_PASSWORD,
} from './types';
import Api from '../../services/api';
import { LOGIN_USER, REGISTER_USER } from '../login/types';

const user = reducerApiAction({
  action: GET_CURRENT_USER,
  api: Api.users.currentUser,
  reducer: (state, action) => {
    if (
      action.type === `${LOGIN_USER}_SUCCESS` ||
      action.type === `${UPDATE_ACCOUNT_INFORMATION}_SUCCESS` ||
      action.type === `${REGISTER_USER}_SUCCESS`
    ) {
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    }
    return state;
  },
});

const accountInformation = reducerApiAction({
  action: UPDATE_ACCOUNT_INFORMATION,
  api: Api.users.profile.updateAccount,
});

const changePassword = reducerApiAction({
  action: UPDATE_ACCOUNT_PASSWORD,
  api: Api.users.profile.changePassword,
});

const createPassword = reducerApiAction({
  action: CREATE_ACCOUNT_PASSWORD,
  api: Api.users.profile.resetPassword,
});

const forgotPassword = reducerApiAction({
  action: FORGOT_ACCOUNT_PASSWORD,
  api: Api.users.profile.forgotPassword,
});

export default reducerBuilder({
  middleware: {
    user,
    accountInformation,
    changePassword,
    createPassword,
    forgotPassword,
  },
});
