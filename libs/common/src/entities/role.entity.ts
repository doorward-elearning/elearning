import { Column, Entity, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('Roles')
export default class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: Array<UserEntity>;
}
