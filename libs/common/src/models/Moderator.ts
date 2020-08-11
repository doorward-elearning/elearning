import { User } from '@doorward/common/models/User';
import { Conference } from '@doorward/common/models/Conference';

export interface Moderator extends User {
  authoredConferences: Array<Conference>;
}
