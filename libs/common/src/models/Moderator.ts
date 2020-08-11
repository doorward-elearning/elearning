import { User } from '@doorward/common/models/User';
import { Forum } from '@doorward/common/models/Forum';

export interface Moderator extends User {
  authoredForums: Array<Forum>;
}
