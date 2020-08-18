import { JoinColumn, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import BaseEntity from './base.entity';

export default class BaseOrganizationEntity extends BaseEntity {
  @ManyToOne(() => OrganizationEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'organizationId',
  })
  organization: OrganizationEntity;
}
