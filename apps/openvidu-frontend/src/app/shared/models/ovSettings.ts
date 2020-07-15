import { OvSettings } from '@doorward/common/types/openvidu';
import _ from 'lodash';

export class OvSettingsModel implements OvSettings {
  chat = true;
  autopublish = true;
  logoUrl = '';
  toolbarButtons = {
    video: true,
    audio: true,
    fullscreen: true,
    screenShare: true,
    layoutSpeaking: true,
    exit: true,
  };

  public set(settings?: OvSettings) {
    if (settings) {
      this.chat = settings.chat === undefined ? this.chat : settings.chat;
      this.autopublish = settings.autopublish === undefined ? this.autopublish : settings.autopublish;
      this.logoUrl = settings.logoUrl || this.logoUrl;
      this.toolbarButtons = _.merge({}, this.toolbarButtons, _.pickBy(settings.toolbarButtons || {}, _.identity));
    }
  }

  public hasVideo(): boolean {
    return this.toolbarButtons.video;
  }

  public hasScreenSharing(): boolean {
    return this.toolbarButtons.screenShare;
  }

  public hasLayoutSpeaking(): boolean {
    return this.toolbarButtons.layoutSpeaking;
  }

  public hasFullscreen(): boolean {
    return this.toolbarButtons.fullscreen;
  }

  public hasAudio(): boolean {
    return this.toolbarButtons.audio;
  }

  public hasExit(): boolean {
    return this.toolbarButtons.exit;
  }

  public setScreenSharing(screenShare: boolean) {
    this.toolbarButtons.screenShare = screenShare;
  }
}
