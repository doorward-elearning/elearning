import { Action } from '@edudoor/ui/src/reducers/reducers';
import { JOIN_MEETING } from './types';

export const joinMeetingAction = (id: string): Action => ({
  type: JOIN_MEETING,
  payload: [id],
});
