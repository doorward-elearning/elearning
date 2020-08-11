import {
  FETCH_CONFERENCE_CREATOR_REPORT,
  FETCH_CONFERENCE_CREATOR_REPORT_LIST,
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

export const fetchConferenceCreatorReportList = (): Action => ({
  type: FETCH_CONFERENCE_CREATOR_REPORT_LIST,
});

export const fetchConferenceCreatorReport = (moderatorId: string): Action => ({
  type: FETCH_CONFERENCE_CREATOR_REPORT,
  payload: [moderatorId],
});
