import {
  ADD_MEMBER,
  CHANGE_MEMBERS_ACCOUNT_INFORMATION,
  CHANGE_MEMBERS_PASSWORD,
  FETCH_MEMBER_LIST,
  GET_MEMBER,
} from './types';
import { AccountDetailsBody, ChangePasswordBody, CreateMemberBody } from '../../services/models/requestBody';
import { PaginationQuery } from '@doorward/common/types/api';
import { ActionCreator } from '@doorward/ui/reducers/reducers';

export const fetchMemberListAction: ActionCreator = (
  pagination?: PaginationQuery,
  query?: { notRegisteredTo?: number }
) => ({
  type: FETCH_MEMBER_LIST,
  payload: [query],
  pagination,
});

export const addMemberAction = (body: CreateMemberBody) => ({
  type: ADD_MEMBER,
  payload: [body],
});

export const getMemberAction = (id: string) => ({
  type: GET_MEMBER,
  payload: [id],
});

export const changeMembersPassword = (id: string, body: ChangePasswordBody) => ({
  type: CHANGE_MEMBERS_PASSWORD,
  payload: [id, body],
});

export const changeMembersAccountInformationAction = (id: string, body: AccountDetailsBody) => ({
  type: CHANGE_MEMBERS_ACCOUNT_INFORMATION,
  payload: [id, body],
});
