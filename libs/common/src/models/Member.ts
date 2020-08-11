import { User } from '@doorward/common/models/User';
import { Forum } from '@doorward/common/models/Forum';

export interface Member extends User {
  forums: Array<Forum>;
  forumsInProgress: Array<Forum>;
}
