import { CREATE_GROUP, FETCH_GROUPS } from './types';
import { CreateGroupBody } from '../../services/models/requestBody';

export const fetchGroupsAction = (type: string) => ({
  type: FETCH_GROUPS,
  payload: [type],
});

export const createGroupAction = (groupBody: CreateGroupBody) => ({
  type: CREATE_GROUP,
  payload: [groupBody],
});
