import { CREATE_GROUP, FETCH_GROUP, FETCH_GROUPS, UPDATE_GROUP } from './types';
import { CreateGroupBody, FetchGroupQuery, UpdateGroupBody } from '../../services/models/requestBody';

export const fetchGroupsAction = (query: FetchGroupQuery) => ({
  type: FETCH_GROUPS,
  payload: [query],
});

export const createGroupAction = (groupBody: CreateGroupBody) => ({
  type: CREATE_GROUP,
  payload: [groupBody],
});

export const fetchGroup = (groupId: string) => ({
  type: FETCH_GROUP,
  payload: [groupId],
});

export const updateGroupAction = (groupId: string, groupBody: UpdateGroupBody) => ({
  type: UPDATE_GROUP,
  payload: [groupId, groupBody],
});
