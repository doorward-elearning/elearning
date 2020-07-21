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
import { MeetingCapabilities } from '@doorward/common/types/meetinCapabilities';

export class ExternalConfigModel implements OpenviduWebComponentConfig {
  constructor() {
    this.ovSettings = new OvSettingsModel();
  }

  public static DEFAULT_SESSION_CONFIG: SessionConfig = {
    logoUrl: {
      dark: environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_white.png',
      base: environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_blue.png',
    },
    capabilities: new Capabilities(MeetingCapabilities, [
      MeetingCapabilities.JOIN_WITH_ACTIVE_VIDEO,
      MeetingCapabilities.PUBLISH_VIDEO,
      MeetingCapabilities.PUBLISH_AUDIO,
      MeetingCapabilities.CHAT,
      MeetingCapabilities.AUTO_JOIN_SESSION,
      MeetingCapabilities.SHARE_SCREEN,
      MeetingCapabilities.GO_FULL_SCREEN,
      MeetingCapabilities.EXIT_MEETING,
      MeetingCapabilities.SPEAKING_LAYOUT,
    ]),
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
    return this.can(MeetingCapabilities.PUBLISH_VIDEO);
  }

  public hasScreenSharing(): boolean {
    return this.can(MeetingCapabilities.SHARE_SCREEN);
  }

  public hasLayoutSpeaking(): boolean {
    return this.can(MeetingCapabilities.SPEAKING_LAYOUT);
  }

  public hasFullscreen(): boolean {
    return this.can(MeetingCapabilities.GO_FULL_SCREEN);
  }

  public hasAudio(): boolean {
    return this.can(MeetingCapabilities.PUBLISH_AUDIO);
  }

  public hasExit(): boolean {
    return this.can(MeetingCapabilities.EXIT_MEETING);
  }

  public isModerator(): boolean {
    return this.user.role === OPENVIDU_ROLES.MODERATOR;
  }

  public can(capability: MeetingCapabilities) {
    return !!this.sessionConfig.capabilities.has(capability);
  }
}
