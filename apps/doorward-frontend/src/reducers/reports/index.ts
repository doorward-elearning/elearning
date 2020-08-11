import {
  FETCH_FORUM_CREATOR_REPORT,
  FETCH_FORUM_CREATOR_REPORT_LIST,
  FETCH_MEMBER_REPORT,
  FETCH_MEMBER_REPORT_LIST
} from './types';
import Api from '../../services/api';
import reducerBuilder, { reducerApiAction } from '@doorward/ui/reducers/builder';

const memberReportList = reducerApiAction({
  action: FETCH_MEMBER_REPORT_LIST,
  api: Api.reports.members.list
});

const singleMember = reducerApiAction({
  action: FETCH_MEMBER_REPORT,
  api: Api.reports.members.get
});

const moderatorReportList = reducerApiAction({
  action: FETCH_FORUM_CREATOR_REPORT_LIST,
  api: Api.reports.moderators.list
});

const singleModerator = reducerApiAction({
  action: FETCH_FORUM_CREATOR_REPORT,
  api: Api.reports.moderators.get
});

export default reducerBuilder({
  middleware: {
    memberReportList,
    singleMember,
    moderatorReportList,
    singleModerator
  }
});
