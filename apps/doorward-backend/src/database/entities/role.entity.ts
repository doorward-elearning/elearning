import { Column, Entity, OneToMany } from 'typeorm';
import UserRolesEntity from './user.roles.entity';
import BaseEntity from './base.entity';

@Entity('Roles')
export default class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserRolesEntity, (userRole) => userRole.role)
  users: Array<UserRolesEntity>;
}
