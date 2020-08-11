import {
  FETCH_FORUM_CREATOR_REPORT,
  FETCH_FORUM_CREATOR_REPORT_LIST,
  FETCH_MEMBER_REPORT,
  FETCH_MEMBER_REPORT_LIST,
} from './types';
import { Action } from '@doorward/ui/reducers/reducers';

export const fetchMemberReportsList = (): Action => ({
  type: FETCH_MEMBER_REPORT_LIST,
});

export const fetchMemberReport = (memberId: string): Action => ({
  type: FETCH_MEMBER_REPORT,
  payload: [memberId],
});

export const fetchForumCreatorReportList = (): Action => ({
  type: FETCH_FORUM_CREATOR_REPORT_LIST,
});

export const fetchForumCreatorReport = (moderatorId: string): Action => ({
  type: FETCH_FORUM_CREATOR_REPORT,
  payload: [moderatorId],
});
