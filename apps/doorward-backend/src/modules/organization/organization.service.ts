import { Injectable } from '@nestjs/common';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { currentOrganization } from '../../config/organizationSetup';

@Injectable()
export default class OrganizationService {
  organization: OrganizationEntity;

  constructor() {
    this.organization = currentOrganization;
  }

  public get(): OrganizationEntity {
    return this.organization;
  }
}
