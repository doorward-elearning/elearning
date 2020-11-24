import { Expose } from 'class-transformer';
import OrganizationModel from '@doorward/common/models/organization.model';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class OrganizationResponse extends DApiResponse {
  @Expose()
  organization: OrganizationModel;
}

export class OrganizationsResponse extends DApiResponse {
  @Expose()
  organizations: OrganizationModel[];
}
