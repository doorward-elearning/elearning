import { Injectable } from '@nestjs/common';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { ORGANIZATION } from '../../bootstrap/organizationSetup';

@Injectable()
export class OrganizationsService {
  organization: OrganizationEntity;

  constructor() {
    this.organization = ORGANIZATION;
  }

  public get(): OrganizationEntity {
    return this.organization;
  }
}
