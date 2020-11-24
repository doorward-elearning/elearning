import { Column, Entity, ManyToMany } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import RoleEntity from '@doorward/common/entities/role.entity';
import PrivilegeModel  from '@doorward/common/models/privilege.model';

@Entity('Privileges')
export default class PrivilegeEntity extends BaseEntity implements PrivilegeModel {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.privileges)
  roles: RoleEntity[];
}
