import { Model } from '@edudoor/common/models/Model';
import { User } from '@edudoor/common/models/User';

export interface Group extends Model {
  name: string;
  members: Array<User>;
}
