import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class OrganizationResponse extends DApiResponse {
  @Expose()
  organization: OrganizationEntity;
}

export class OrganizationsResponse extends DApiResponse {
  @Expose()
  organizations: OrganizationEntity[];
}
