import { User } from '@doorward/common/models/User';
import { Conference } from '@doorward/common/models/Conference';

export interface Member extends User {
  conferences: Array<Conference>;
  conferencesInProgress: Array<Conference>;
}
