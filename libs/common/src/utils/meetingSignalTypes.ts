import { OpenviduUser, OpenviduUserSession } from '@doorward/common/types/openvidu';

enum SignalTypes {
  TOGGLE_AUDIO = 'TOGGLE_AUDIO',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  LEAVE_MEETING = 'LEAVE_MEETING',
  USER_UPDATED = 'USER_UPDATED',
  TOGGLE_VIDEO_CONTROL = 'TOGGLE_VIDEO_CONTROL',
  CHAT = 'CHAT',
}

export interface SignalData extends Record<SignalTypes, unknown> {
  [SignalTypes.TOGGLE_AUDIO]: { request: boolean };
  [SignalTypes.TOGGLE_VIDEO]: { request: boolean };
  [SignalTypes.LEAVE_MEETING]: undefined;
  [SignalTypes.USER_UPDATED]: { session: OpenviduUserSession };
  [SignalTypes.TOGGLE_VIDEO_CONTROL]: undefined;
  [SignalTypes.CHAT]: { message: string; sender: OpenviduUser };
}

export default SignalTypes;
