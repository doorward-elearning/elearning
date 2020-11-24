import BaseModel from '@doorward/common/models/base.model';
import { JitsiMeetingConfig, MeetingPlatform } from '@doorward/common/types/meeting';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import { OrganizationModels } from '@doorward/common/types/organizations';

export default interface OrganizationModel extends BaseModel {
  name: string;
  description: string;
  link: string;
  descriptiveLogo: boolean;
  darkThemeIcon: string;
  icon: string;
  meetingPlatform: MeetingPlatform;
  customerType: CustomerTypes;
  models?: Record<OrganizationModels, Array<string>>;
  meetings?: JitsiMeetingConfig;
}
