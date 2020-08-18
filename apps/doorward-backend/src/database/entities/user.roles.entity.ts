import BaseOrganizationEntity from './base.organization.entity';
import { Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import RoleEntity from './role.entity';

@Entity('UserRoles')
export default class UserRolesEntity extends BaseOrganizationEntity {
  @ManyToOne(() => UserEntity, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  role: RoleEntity;
}
