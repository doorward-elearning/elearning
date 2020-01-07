import { Model } from '@edudoor/common/models/Model';
import { Organization } from '@edudoor/common/models/Organization';

export interface Role extends Model {
  name: string;
  description?: string;
  organizationId: string;
  organization: Organization;
}
