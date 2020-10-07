/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
import config from '@doorward/ui/components/JitsiMeeting/config';
import interfaceConfig from '@doorward/ui/components/JitsiMeeting/interface.config';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare global {
  declare class Plyr {
    constructor(...args: any);
  }

  declare namespace JitsiMeet {
    export interface JitsiMeetOptions {
      roomName?: string;
      width?: string | number;
      height?: string | number;
      parentNode?: HTMLElement;
      configOverwrite?: Partial<typeof config>;
      interfaceConfigOverwrite?: Partial<typeof interfaceConfig>;
      noSSL?: boolean;
      jwt?: string;
      onload?: () => void;
      invitees?: Array<Record<string, any>>;
      devices?: Map<any, any>;
      userInfo?: Record<string, any>;
    }

    export type Events =
      | 'cameraError'
      | 'avatarChanged'
      | 'audioAvailabilityChanged'
      | 'audioMuteStatusChanged'
      | 'endpointTextMessageReceived'
      | 'micError'
      | 'screenSharingStatusChanged'
      | 'domainSpeakerChanged'
      | 'tileViewChanged'
      | 'incomingMessage'
      | 'outgoingMessage'
      | 'displayNameChanged'
      | 'deviceListChanged'
      | 'emailChange'
      | 'feedbackSubmitted'
      | 'filmstripDisplayChanged'
      | 'participantJoined'
      | 'participantKickedOut'
      | 'participantLeft'
      | 'participantRoleChanged'
      | 'passwordRequired'
      | 'videoConferenceJoined'
      | 'videoConferenceLeft'
      | 'videoAvailabilityChanged'
      | 'videoMuteStatusChanged'
      | 'readyToClose'
      | 'subjectChange'
      | 'suspendDetected';

    export type Commands = 'startRecording' | 'stopRecording';

    export interface CommandArguments extends Record<Commands, any> {
      startRecording: {
        mode?: string;
        dropboxToken?: string;
        shouldShare?: boolean;
        youtubeStreamKey?: string;
        youtubeBroadcastID?: string;
      };
    }

    export interface EventListener extends Record<Event, Function> {
      suspendDetected: () => void;
      subjectChange: (event: { subject: string }) => void;
      readyToClose: () => void;
      videoMuteStatusChanged: (event: { muted: boolean }) => void;
      videoAvailabilityChanged: (event: { available: boolean }) => void;
      videoConferenceLeft: (event: { roomName: string }) => void;
      videoConferenceJoined: (event: { roomName: string; id: string; displayName: string; avatarURL: string }) => void;
      passwordRequired: () => void;
      participantRoleChanged: (event: { id: string; role: string }) => void;
      participantLeft: (event: { id: string }) => void;
      participantKickedOut: (event: { kicked: { id: string; local: boolean }; kicker: { id: string } }) => void;
      participantJoined: (event: { id: string; displayName: string }) => void;
      filmstripDisplayChanged: (event: { visible: boolean }) => void;
      feedbackSubmitted: (event: { error: string }) => void;
      emailChange: (event: { id: string; email: string }) => void;
      deviceListChanged: (event: { devices: object }) => void;
      displayNameChange: (event: { id: string; displayName: string }) => void;
      outgoingMessage: (event: { message: string }) => void;
      incomingMessage: (event: { from: string; nick: string; message: string }) => void;
      tileViewChanged: (event: { enabled: boolean }) => void;
      dominantSpeakerChanged: (event: { id: string }) => void;
      screenSharingStatusChanged: (event: { on: boolean; details: { sourceType: string | undefined } }) => void;
      micError: (event: { tpe: string; message: string }) => void;
      endpointTextMessageReceived: (event: {
        senderInfo: { jid: string; id: string };
        eventData: { name: string; text: string };
      }) => void;
      audioMuteStatusChanged: (event: { muted: boolean }) => void;
      audioAvailabilityChanged: (event: { available: boolean }) => void;
      avatarChanged: (event: { id: string; avatarURL: string }) => void;
      cameraError: (event: { type: string; message: string }) => void;
    }
  }

  declare class JitsiMeetExternalAPI {
    constructor(domain: string, options: JitsiMeet.JitsiMeetOptions);

    public dispose(): void;

    public addEventListener<K extends JitsiMeet.Events>(event: K, listener: JitsiMeet.EventListener[K]): void;

    public executeCommand<C extends JitsiMeet.Commands>(command: C, arguments: JitsiMeet.CommandArguments[C]): void;
  }
}
