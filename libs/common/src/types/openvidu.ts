import Capabilities from '@doorward/common/utils/Capabilities';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';

export enum OPENVIDU_ROLES {
  PUBLISHER = 'PUBLISHER',
  SUBSCRIBER = 'SUBSCRIBER',
  MODERATOR = 'MODERATOR',
}

export interface CreateSessionResponse {
  id: string;
  createdAt: string;
}

export interface CreateTokenBody {
  session: string;
  role: OPENVIDU_ROLES;
  data?: string;
  kurentoOptions?: KurentoOptions;
}

export interface DeleteSessionResponse {}

export interface Subscriber {
  createdAt: number;
  streamId: string;
}

export interface Publisher {
  createdAt: number;
  streamId: string;
  mediaOptions: {
    hasAudio: boolean;
    hasVideo: boolean;
    videoActive: boolean;
    typeOfVideo: 'CAMERA' | '';
    frameRate: number;
    videoDimensions: string;
    filter: Record<string, any>;
  };
}

export interface OpenviduConnection {
  connectionId: string;
  createdAt: number;
  location: string;
  platform: string;
  role: OPENVIDU_ROLES;
  clientData: string;
  serverData: any;
  token: string;
  publishers: Array<Publisher>;
}

export interface SessionInfoResponse {
  sessionId: string;
  createdAt: number;
  mediaMode: 'ROUTED' | 'RELAYED';
  recording: boolean;
  recordingMode: 'ALWAYS' | 'MANUAL';
  defaultOutputMode: 'COMPOSED' | 'INDIVIDUAL';
  defaultRecordingLayout: string;
  defaultCustomLayout: string;
  customSessionId: string;
  connections: {
    numberOfElements: number;
    content: Array<OpenviduConnection>;
  };
  subscriber: Array<Subscriber>;
}

export interface SessionsInfoResponse {
  numberOfElements: number;
  content: Array<SessionInfoResponse>;
}

export interface KurentoOptions {
  videoMaxRecvBandwidth: number;
  videoMinRecvBandwidth: number;
  videoMaxSendBandwidth: number;
  videoMinSendBandwidth: number;
  allowedFilters: Array<string>;
}

export interface OpenviduSessionResponse extends CreateTokenBody {
  id: string;
  token: string;
}

export enum OpenviduTheme {
  DARK = 'dark',
  LIGHT = 'base',
}

export interface OpenviduUser {
  name?: string;
  avatar?: string;
  role?: OPENVIDU_ROLES;
  data?: any;
}

export interface WhiteboardSessionInfo {
  active?: boolean;
  createdBy: string;
}

export interface SessionInfo extends CreateTokenBody {
  screenToken: string;
  webcamToken: string;
  userId: string;
  whiteboardSessionInfo?: WhiteboardSessionInfo;
  raisingHand?: boolean;
}

export interface OpenviduUserSession {
  user: OpenviduUser;
  jwtToken?: string;
  sessionInfo: SessionInfo;
  sessionConfig: SessionConfig;
}

export interface OpenviduJWTPayload {
  user: OpenviduUser;
  sessionInfo: OpenviduSessionResponse;
}

export interface OvSettings {
  chat: boolean;
  autopublish: boolean;
  logoUrl: string;
  toolbarButtons: {
    audio: boolean;
    video: boolean;
    screenShare: boolean;
    fullscreen: boolean;
    layoutSpeaking: boolean;
    exit: boolean;
  };
}

export interface OpenviduWebComponentConfig {
  sessionId: string;
  sessionTitle: string;
  ovServerApiUrl: string;
  redirectOnEnd: string;
  theme: OpenviduTheme;
  user: OpenviduUser;
  sessionConfig: SessionConfig;
  sessionInfo?: SessionInfo;
}

export class MeetingCapabilitiesComponent {
  public MeetingCapabilities = MeetingCapabilities;
}

export type SessionLogo = string | { dark: string; base: string } | undefined;

export interface SessionConfig {
  logoUrl?: SessionLogo;
  capabilities: Capabilities<typeof MeetingCapabilities>;
}

export enum MeetingQuestionTypes {
  TRUE_OR_FALSE = 'TRUE_OR_FALSE',
  TEXT_INPUT = 'TEXT_INPUT',
}

export interface MeetingQuestion {
  id: string;
  author: string;
  question: string;
  type: MeetingQuestionTypes;
  answers?: Array<MeetingAnswer>;
}

export interface MeetingAnswer {
  id: string;
  questionId: string;
  answer: string;
  author: string;
}
