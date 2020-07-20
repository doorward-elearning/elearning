import { OvSettingsModel } from './ovSettings';
import {
  OPENVIDU_ROLES,
  OpenviduTheme,
  OpenviduUser,
  OpenviduWebComponentConfig,
  SessionConfig,
} from '@doorward/common/types/openvidu';

export class ExternalConfigModel implements OpenviduWebComponentConfig {
  constructor() {
    this.ovSettings = new OvSettingsModel();
  }

  public static DEFAULT_SESSION_CONFIG: SessionConfig = {
    joinWithActiveAudio: false,
    joinWithActiveVideo: true,
    disableVideo: true,
    disableAudio: false,
  };
  ovSettings: OvSettingsModel;
  sessionId: string;
  sessionTitle: string;
  ovServerApiUrl: string;
  redirectOnEnd = '/';
  theme = (localStorage.getItem('theme') as OpenviduTheme) || OpenviduTheme.DARK;
  user: OpenviduUser;
  sessionConfig: SessionConfig = ExternalConfigModel.DEFAULT_SESSION_CONFIG;

  public hasVideo(): boolean {
    return this.isModerator() || (this.ovSettings.toolbarButtons.video && !this.sessionConfig.disableVideo);
  }

  public hasScreenSharing(): boolean {
    return this.ovSettings.toolbarButtons.screenShare;
  }

  public hasLayoutSpeaking(): boolean {
    return this.ovSettings.toolbarButtons.layoutSpeaking;
  }

  public hasFullscreen(): boolean {
    return this.ovSettings.toolbarButtons.fullscreen;
  }

  public hasAudio(): boolean {
    return this.isModerator() || (this.ovSettings.toolbarButtons.audio && !this.sessionConfig.disableAudio);
  }

  public hasExit(): boolean {
    return this.ovSettings.toolbarButtons.exit;
  }

  public isModerator(): boolean {
    return this.user.role === OPENVIDU_ROLES.MODERATOR;
  }
}
