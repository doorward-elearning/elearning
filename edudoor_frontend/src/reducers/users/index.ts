import reducerBuilder, { reducerApiAction } from '../builder';
import { GET_CURRENT_USER } from './types';
import Api from '../../services/api';
import { LOGIN_USER } from '../login/types';

const user = reducerApiAction({
  action: GET_CURRENT_USER,
  api: Api.users.currentUser,
  reducer: (state, action) => {
    if (action.type === `${LOGIN_USER}_SUCCESS`) {
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

export default reducerBuilder({
  middleware: {
    user,
  },
});
