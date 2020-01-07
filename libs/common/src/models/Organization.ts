import { Model } from '@edudoor/common/models/Model';

export interface Organization extends Model {
  name: string;
  description?: string;
}
