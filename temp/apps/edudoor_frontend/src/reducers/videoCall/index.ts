import reducerBuilder, { reducerApiAction } from '@edudoor/ui/src/reducers/builder';
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
