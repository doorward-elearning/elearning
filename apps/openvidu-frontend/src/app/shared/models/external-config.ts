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
import Capabilities from '@doorward/common/utils/Capabilities';
import { defaultMeetingCapabilities, MeetingCapabilities as MC } from '@doorward/common/types/meetingCapabilities';

export class ExternalConfigModel implements OpenviduWebComponentConfig {
  constructor() {
    this.ovSettings = new OvSettingsModel();
  }

  public static DEFAULT_SESSION_CONFIG: SessionConfig = {
    logoUrl: {
      dark: environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_white.png',
      base: environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_blue.png',
    },
    capabilities: new Capabilities(MC, [...defaultMeetingCapabilities]),
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
    return this.can(MC.PUBLISH_VIDEO);
  }

  public hasScreenSharing(): boolean {
    return this.can(MC.SHARE_SCREEN);
  }

  public hasLayoutSpeaking(): boolean {
    return this.can(MC.SPEAKING_LAYOUT);
  }

  public hasFullscreen(): boolean {
    return this.can(MC.GO_FULL_SCREEN);
  }

  public hasAudio(): boolean {
    return this.can(MC.PUBLISH_AUDIO);
  }

  public hasExit(): boolean {
    return this.can(MC.EXIT_MEETING);
  }

  public isModerator(): boolean {
    return this.user.role === OPENVIDU_ROLES.MODERATOR;
  }

  public can(capability: MC) {
    return !!this.sessionConfig.capabilities.has(capability);
  }
}
