import { OvSettingsModel } from './ovSettings';
import { OpenviduTheme, OpenviduUser, OpenviduWebComponentConfig } from '@doorward/common/types/openvidu';

export class ExternalConfigModel implements OpenviduWebComponentConfig {
  ovSettings: OvSettingsModel;
  sessionId: string;
  sessionTitle: string;
  ovServerApiUrl: string;
  redirectOnEnd = '/';
  theme = (localStorage.getItem('theme') as OpenviduTheme) || OpenviduTheme.DARK;
  user: OpenviduUser;

  constructor() {
    this.ovSettings = new OvSettingsModel();
  }
}
