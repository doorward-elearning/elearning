import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user-model';
import { MeetingCapabilities } from '@doorward/common/types/openvidu';

@Pipe({
  name: 'capabilities',
})
export class CapabilitiesPipe implements PipeTransform {
  transform(user: UserModel, capability: MeetingCapabilities): boolean {
    if (user) {
      const sessionConfig = user.session?.sessionConfig;
      if (sessionConfig) {
        return !!sessionConfig.capabilities.find(ca => ca === capability);
      }
    }
    return false;
  }
}
