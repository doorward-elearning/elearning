export enum OPENVIDU_ROLES {
  PUBLISHER = 'PUBLISHER',
  SUBSCRIBER = 'SUBSCRIBER',
  MODERATOR = 'MODERATOR',
}

export interface CreateSessionResponse {
  id: string;
  createdAt: string;
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

export interface Connection {
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
  connections: Array<Connection>;
  subscriber: Array<Subscriber>;
}

export interface SessionsInfoResponse {
  numberOfElements: number;
  content: Array<SessionInfoResponse>;
}

export interface CreateTokenResponse<T = any> {
  id: string;
  session: string;
  role: OPENVIDU_ROLES;
  data: T;
  token: string;
  kurentoOptions?: {
    videoMaxRecvBandwidth: number;
    videoMinRecvBandwidth: number;
    videoMaxSendBandwidth: number;
    videoMinSendBandwidth: number;
    allowedFilters: Array<string>;
  };
}
