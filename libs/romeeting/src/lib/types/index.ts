export interface Track {
  getParticipantId(): string;
  getType(): string;
  hasBeenMuted: boolean;
  audioLevel: number;
  stream: MediaStream;
  track: MediaStreamTrack;
  type: string;
  videoType: string;

  [name: string]: any;
}

export type Tracks = {
  video: Track;
  audio: Track;
};

export class RemoteUser {
  constructor(private user: any) {
    this.tracks = {
      video: null,
      audio: null,
    };
  }

  getId(): string {
    return this.user._id;
  }
  getDisplayName(): string {
    return this.user._displayName;
  }

  getUser() {
    return this.user;
  }

  setDisplayName(displayName: string): RemoteUser {
    this.user._displayName = displayName;
    return this;
  }

  tracks: Tracks;
}
