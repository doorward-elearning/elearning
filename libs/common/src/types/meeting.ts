import { SessionConfig } from '@doorward/common/types/openvidu';

export interface DoorwardMeeting extends SessionConfig {}

export enum MeetingStatus {
  PENDING = 'Pending',
  STARTED = 'Started',
  ENDED = 'Ended',
}

export enum MeetingRoomTypes {
  PRIVATE = 'Private',
  PUBLIC = 'Public',
}

export enum MeetingPlatform {
  OPENVIDU = 'Openvidu',
  JITSI = 'Jitsi',
}
