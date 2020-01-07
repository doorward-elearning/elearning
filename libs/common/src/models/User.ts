import { Model } from '@edudoor/common/models/Model';
import { Organization } from '@edudoor/common/models/Organization';
import { Role } from '@edudoor/common/models/Role';

export interface User extends Model {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  country: string;
  fullName: string;
  city: string;
  organizationId: string;
  organization: Organization;
  roles: Array<Role>;
  status: string;
}
