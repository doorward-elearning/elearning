import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user-model';
import { MeetingCapabilities } from '@doorward/common/types/openvidu';

@Pipe({
  name: 'capabilities',
})
export class CapabilitiesPipe implements PipeTransform {
  transform(user: UserModel, capability: MeetingCapabilities): boolean {
    if (user) {
      return user.can(capability);
    }
    return false;
  }
}
