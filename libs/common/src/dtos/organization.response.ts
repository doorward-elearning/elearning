import OrganizationEntity from '@doorward/common/entities/organization.entity';
import DApiResponse from '@doorward/common/dtos/d.api.response';

export default class OrganizationResponse extends DApiResponse {
  organization: OrganizationEntity;
}

export class OrganizationsResponse extends DApiResponse {
  organizations: OrganizationEntity[];
}
