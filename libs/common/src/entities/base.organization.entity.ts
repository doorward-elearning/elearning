import { BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import OrganizationEntity from './organization.entity';
import { Expose } from 'class-transformer';

export default class BaseOrganizationEntity extends BaseEntity {
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
