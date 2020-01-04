import reducerBuilder, { reducerApiAction } from '../../../../../libs/ui/reducers/builder';
import { JOIN_MEETING } from './types';
import Api from '../../services/api';

const joinMeeting = reducerApiAction({
  action: JOIN_MEETING,
  api: Api.meetingRooms.join,
});

export default reducerBuilder({
  middleware: {
    joinMeeting,
  },
});
