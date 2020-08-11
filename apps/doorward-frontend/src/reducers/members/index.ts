import {
  ADD_MEMBER,
  CHANGE_MEMBERS_ACCOUNT_INFORMATION,
  CHANGE_MEMBERS_PASSWORD,
  FETCH_MEMBER_LIST,
  GET_MEMBER,
} from './types';
import Api from '../../services/api';
import reducerBuilder, { modifyReducer, reducerApiAction } from '@doorward/ui/reducers/builder';

const memberList = reducerApiAction({
  action: FETCH_MEMBER_LIST,
  api: Api.users.members.list,
});

const newMember = reducerApiAction({
  action: ADD_MEMBER,
  api: Api.users.members.create,
});

const member = reducerApiAction({
  action: GET_MEMBER,
  api: Api.users.members.get,
  reducer: (state, action) => {
    if (action.type === `${CHANGE_MEMBERS_ACCOUNT_INFORMATION}_SUCCESS`) {
      return modifyReducer('data.member', state, action, current => {
        return { ...current, ...action.payload.member };
      });
    }
    return state;
  },
});

const changePassword = reducerApiAction({
  action: CHANGE_MEMBERS_PASSWORD,
  api: Api.users.members.changePassword,
});

const changeAccountDetails = reducerApiAction({
  action: CHANGE_MEMBERS_ACCOUNT_INFORMATION,
  api: Api.users.members.update,
});

export default reducerBuilder({
  middleware: { memberList, newMember, member, changePassword, changeAccountDetails },
});
