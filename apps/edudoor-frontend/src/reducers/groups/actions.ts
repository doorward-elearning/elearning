import { FETCH_GROUPS } from './types';

export const fetchGroupsAction = (type: string) => ({
  type: FETCH_GROUPS,
  payload: [type],
});
