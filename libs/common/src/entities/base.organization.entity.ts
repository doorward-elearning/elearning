import { BeforeInsert, getConnectionManager, JoinColumn, ManyToOne } from 'typeorm';
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
    this.organization = await getConnectionManager()
      .get()
      .getRepository(OrganizationEntity)
      .findOne(process.env.ORGANIZATION_ID);
  }
}
