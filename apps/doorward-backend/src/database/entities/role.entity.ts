import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import UserRolesEntity from './user.roles.entity';

@Entity('Roles')
export default class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.roles, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  organization: OrganizationEntity;

  @OneToMany(() => UserRolesEntity, (userRole) => userRole.role)
  userRoles: Array<UserRolesEntity>;
}
