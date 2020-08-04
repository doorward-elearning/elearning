import {
  MeetingQuestion,
  OpenviduUser,
  OpenviduUserSession,
  WhiteboardSessionInfo,
} from '@doorward/common/types/openvidu';
import { CanvasWhiteboardSyncData } from '@doorward/whiteboard/canvas-whiteboard-sync.service';

enum SignalTypes {
  TOGGLE_AUDIO = 'TOGGLE_AUDIO',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  LEAVE_MEETING = 'LEAVE_MEETING',
  USER_UPDATED = 'USER_UPDATED',
  TOGGLE_VIDEO_CONTROL = 'TOGGLE_VIDEO_CONTROL',
  CHAT = 'CHAT',
  WHITEBOARD_SHARING_STARTED = 'WHITEBOARD_SHARING_STARTED',
  WHITEBOARD_SHARING_ENDED = 'WHITEBOARD_SHARING_ENDED',
  WHITEBOARD_UPDATE = 'WHITEBOARD_UPDATE',
  RAISE_HAND = 'RAISE_HAND',
  ASK_QUESTION = 'ASK_QUESTION',
}

export interface SignalData extends Record<SignalTypes, unknown> {
  [SignalTypes.TOGGLE_AUDIO]: { request: boolean };
  [SignalTypes.TOGGLE_VIDEO]: { request: boolean };
  [SignalTypes.LEAVE_MEETING]: undefined;
  [SignalTypes.USER_UPDATED]: { session: OpenviduUserSession };
  [SignalTypes.TOGGLE_VIDEO_CONTROL]: undefined;
  [SignalTypes.CHAT]: { message: string; sender: OpenviduUser };
  [SignalTypes.WHITEBOARD_UPDATE]: CanvasWhiteboardSyncData;
  [SignalTypes.WHITEBOARD_SHARING_STARTED]: WhiteboardSessionInfo;
  [SignalTypes.WHITEBOARD_SHARING_ENDED]: WhiteboardSessionInfo;
  [SignalTypes.ASK_QUESTION]: MeetingQuestion;
}

export default SignalTypes;
