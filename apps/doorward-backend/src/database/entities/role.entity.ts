import { Column, Entity, OneToMany } from 'typeorm';
import UserRolesEntity from './user.roles.entity';
import BaseOrganizationEntity from './base.organization.entity';

@Entity('Roles')
export default class RoleEntity extends BaseOrganizationEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserRolesEntity, (userRole) => userRole.role)
  users: Array<UserRolesEntity>;
}
