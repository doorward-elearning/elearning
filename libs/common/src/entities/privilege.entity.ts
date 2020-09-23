import { Column, Entity, ManyToMany } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import RoleEntity from '@doorward/common/entities/role.entity';

@Entity('Privileges')
export default class PrivilegeEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.privileges)
  roles: RoleEntity[];
}
