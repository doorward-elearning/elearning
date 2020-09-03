import { Column, Entity } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('Privileges')
export default class PrivilegeEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
