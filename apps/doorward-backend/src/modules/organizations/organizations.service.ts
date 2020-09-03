import { Injectable } from '@nestjs/common';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { currentOrganization } from '../../bootstrap/organizationSetup';

@Injectable()
export class OrganizationsService {
  organization: OrganizationEntity;

  constructor() {
    this.organization = currentOrganization;
  }

  public get(): OrganizationEntity {
    return this.organization;
  }
}
