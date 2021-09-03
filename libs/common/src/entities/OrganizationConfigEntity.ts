import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { OrganizationConfigKey } from '@doorward/common/types/organizationConfig';

@Entity('Configurations')
export default class OrganizationConfigEntity extends BaseEntity {
  @Column({ type: 'enum', enum: OrganizationConfigEntity, nullable: false })
  key: OrganizationConfigKey;

  @Column({ nullable: true, type: 'text' })
  value: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.configuration, {
    onDelete: 'CASCADE',
  })
  organization: OrganizationEntity;
}
