import { Action } from '@edudoor/ui/reducers/reducers';
import { JOIN_MEETING } from './types';

export type OpenViduSessionProps = {
  sessionName: string;
  user: string;
  token: string;
};

export const joinMeetingAction = (id: string): Action => ({
  type: JOIN_MEETING,
  payload: [id],
});
