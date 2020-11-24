import BaseModel from '@doorward/common/models/base.model';
import OrganizationModel from '@doorward/common/models/organization.model';

export default interface BaseOrganizationModel extends BaseModel {
  organization: OrganizationModel;
}
