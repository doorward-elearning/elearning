import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import BaseEntity from '@doorward/common/entities/base.entity';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';

@Entity('Roles')
export default class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: Array<UserEntity>;

  @ManyToMany(() => PrivilegeEntity, { onDelete: 'CASCADE', eager: true, cascade: true })
  @JoinTable({ name: 'RolePrivileges', joinColumn: { name: 'roleId' }, inverseJoinColumn: { name: 'privilegeId' } })
  privileges: Array<PrivilegeEntity>;
}
