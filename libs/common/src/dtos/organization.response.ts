import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export default interface OrganizationResponse extends ApiResponse {
  organization: OrganizationEntity;
}

export interface OrganizationsResponse extends ApiResponse {
  organizations: OrganizationEntity[];
}
