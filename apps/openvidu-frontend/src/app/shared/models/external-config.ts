import { OvSettingsModel } from './ovSettings';
import {
  OPENVIDU_ROLES,
  OpenviduTheme,
  OpenviduUser,
  OpenviduWebComponentConfig,
  SessionConfig,
  SessionInfo,
} from '@doorward/common/types/openvidu';
import { environment } from '../../../environments/environment';

export class ExternalConfigModel implements OpenviduWebComponentConfig {
  constructor() {
    this.ovSettings = new OvSettingsModel();
  }

  public static DEFAULT_SESSION_CONFIG: SessionConfig = {
    joinWithActiveAudio: false,
    joinWithActiveVideo: true,
    hasVideo: true,
    hasAudio: true,
    canChat: true,
    autoJoinsSession: true,
    logoUrl: {
      dark: environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_white.png',
      base: environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_blue.png',
    },
    canScreenShare: true,
    canGoFullScreen: true,
    hasSpeakingLayout: true,
    canExit: true,
  };
  ovSettings: OvSettingsModel;
  sessionId: string;
  sessionTitle: string;
  ovServerApiUrl: string;
  redirectOnEnd = '/';
  theme = (localStorage.getItem('theme') as OpenviduTheme) || OpenviduTheme.DARK;
  sessionConfig = ExternalConfigModel.DEFAULT_SESSION_CONFIG;
  sessionInfo: SessionInfo = null;
  user: OpenviduUser;

  public hasVideo(): boolean {
    return this.sessionConfig.hasVideo;
  }

  public hasScreenSharing(): boolean {
    return this.sessionConfig.canScreenShare;
  }

  public hasLayoutSpeaking(): boolean {
    return this.sessionConfig.hasSpeakingLayout;
  }

  public hasFullscreen(): boolean {
    return this.sessionConfig.canGoFullScreen;
  }

  public hasAudio(): boolean {
    return this.sessionConfig.hasAudio;
  }

  public hasExit(): boolean {
    return this.sessionConfig.canExit;
  }

  public isModerator(): boolean {
    return this.user.role === OPENVIDU_ROLES.MODERATOR;
  }
}
