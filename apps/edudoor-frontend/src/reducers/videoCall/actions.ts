import { JOIN_MEETING } from './types';
import { Action } from '@edudoor/ui/reducers/reducers';

export const joinMeetingAction = (id: string): Action => ({
  type: JOIN_MEETING,
  payload: [id],
});
