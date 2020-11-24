import { BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import OrganizationEntity from './organization.entity';
import { Expose } from 'class-transformer';
import BaseOrganizationModel from '@doorward/common/models/base.organization.model';

export default class BaseOrganizationEntity extends BaseEntity implements BaseOrganizationModel {
  @ManyToOne(() => OrganizationEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'organizationId',
  })
  @Expose({ groups: ['organization'] })
  organization: OrganizationEntity;

  @BeforeInsert()
  async setOrganization() {
    try {
      this.organization = await this.getRepository(OrganizationEntity).findOne(process.env.ORGANIZATION_ID);
    } catch (error) {}
  }
}
