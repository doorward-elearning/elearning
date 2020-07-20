import { ExternalConfigModel } from './external-config';
import { OpenviduWebComponentConfig } from '@doorward/common/types/openvidu';
import _ from 'lodash';

export class WebComponentModel extends ExternalConfigModel {
  private readonly NAME = 'WebComponent';

  constructor() {
    super();
  }

  setSessionConfig(config: OpenviduWebComponentConfig) {
    Object.keys(config).forEach(key => {
      if (config[key] !== undefined) {
        if (key !== 'ovSettings') {
          this[key] = config[key];
        } else if (typeof config[key] === 'object') {
          this[key] = _.merge({}, this[key], config[key]);
        } else {
          this.ovSettings.set(config.ovSettings);
        }
      }
    });
  }

  canJoinToSession(): boolean {
    return !!this.ovServerApiUrl;
  }
  public getComponentName() {
    return this.NAME;
  }
}
