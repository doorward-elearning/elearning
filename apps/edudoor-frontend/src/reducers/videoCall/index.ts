import { JOIN_MEETING } from './types';
import Api from '../../services/api';
import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';

const joinMeeting = reducerApiAction({
  action: JOIN_MEETING,
  api: Api.meetingRooms.join
});

export default reducerBuilder({
  middleware: {
    joinMeeting
  }
});
