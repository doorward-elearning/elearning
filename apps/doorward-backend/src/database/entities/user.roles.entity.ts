import BaseEntity from './base.entity';
import { Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import RoleEntity from './role.entity';

@Entity('UserRoles')
export default class UserRolesEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  role: RoleEntity;
}
