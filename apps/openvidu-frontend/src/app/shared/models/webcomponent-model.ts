import { ExternalConfigModel } from './external-config';
import { OpenviduWebComponentConfig } from '@doorward/common/types/openvidu';
import _ from 'lodash';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';

export class WebComponentModel extends ExternalConfigModel {
  private readonly NAME = 'WebComponent';

  constructor() {
    super();
  }

  setSessionConfig(config: OpenviduWebComponentConfig) {
    Object.keys(config).forEach(key => {
      if (config[key] !== undefined) {
        if (typeof config[key] === 'object') {
          this[key] = _.merge({}, this[key], config[key]);
        } else {
          this[key] = config[key];
        }
      }
    });

    if (!this.sessionConfig.capabilities?.has) {
      this.sessionConfig.capabilities = new Capabilities<typeof MeetingCapabilities>(
        MeetingCapabilities,
        (this.sessionConfig.capabilities as any).capabilities
      );
    }
    console.log(this, 'Moses');
  }

  canJoinToSession(): boolean {
    return !!this.ovServerApiUrl;
  }
  public getComponentName() {
    return this.NAME;
  }
}
