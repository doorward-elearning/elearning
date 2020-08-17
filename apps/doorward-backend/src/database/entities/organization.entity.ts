import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import UserEntity from './user.entity';
import RoleEntity from './role.entity';

@Entity('Organizations')
export class OrganizationEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @OneToMany(() => UserEntity, (user) => user.organization)
  users: Array<UserEntity>;

  @OneToMany(() => RoleEntity, (user) => user.organization)
  roles: Array<RoleEntity>;
}
