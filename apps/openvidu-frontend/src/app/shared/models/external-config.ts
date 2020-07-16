import { OvSettingsModel } from './ovSettings';
import { environment } from '../../../environments/environment';
import { OPENVIDU_ROLES, OpenviduTheme, OpenviduWebComponentConfig } from '@doorward/common/types/openvidu';

export class ExternalConfigModel implements OpenviduWebComponentConfig {
  ovSettings: OvSettingsModel;
  sessionId: string;
  sessionTitle: string;
  avatar: string;
  ovServerApiUrl: string = environment.OPENVIDU_API_URL;
  redirectOnEnd = '/';
  theme = (localStorage.getItem('theme') as OpenviduTheme) || OpenviduTheme.DARK;
  nickname: string;
  role: OPENVIDU_ROLES = OPENVIDU_ROLES.PUBLISHER;

  constructor() {
    this.ovSettings = new OvSettingsModel();
  }
}
