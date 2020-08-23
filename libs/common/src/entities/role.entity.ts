import { Column, Entity, OneToMany } from 'typeorm';
import BaseOrganizationEntity from './base.organization.entity';
import UserEntity from './user.entity';

@Entity('Roles')
export default class RoleEntity extends BaseOrganizationEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: Array<UserEntity>;
}
