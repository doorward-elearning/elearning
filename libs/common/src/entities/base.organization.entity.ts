import { BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import OrganizationEntity from './organization.entity';

export default class BaseOrganizationEntity extends BaseEntity {
  @ManyToOne(() => OrganizationEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'organizationId',
  })
  organization: OrganizationEntity;

  @BeforeInsert()
  async setOrganization() {
    try {
      this.organization = await this.getRepository(OrganizationEntity).findOne(process.env.ORGANIZATION_ID);
    } catch (error) {}
  }
}
