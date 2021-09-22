import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import BaseEntity from '@doorward/common/entities/base.entity';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { Expose } from 'class-transformer';

@Entity('Roles')
export default class RoleEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  displayName: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: Array<UserEntity>;

  @ManyToMany(() => PrivilegeEntity, (privilege) => privilege.roles, { onDelete: 'CASCADE', lazy: true })
  @JoinTable({ name: 'RolePrivileges', joinColumn: { name: 'roleId' }, inverseJoinColumn: { name: 'privilegeId' } })
  @Expose({ groups: ['privileges'] })
  privileges: Promise<Array<PrivilegeEntity>> | Array<PrivilegeEntity>;
}
