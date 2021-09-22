import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { OrganizationConfigKey } from '@doorward/common/types/organizationConfig';

@Entity('Configurations')
export default class OrganizationConfigEntity extends BaseEntity {
  @Column({ type: 'text', unique: true })
  key: OrganizationConfigKey;

  @Column({ nullable: true, type: 'text' })
  value: string;
}
