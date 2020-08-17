import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './user.entity';
import Tools from '@doorward/common/utils/Tools';
import RoleEntity from './role.entity';

/**
 * Do not define relationships in this file as it will create cyclic imports.
 */
@Entity('Organizations')
export class OrganizationEntity {
  @PrimaryColumn({ nullable: false })
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @Column()
  public name: string;

  @Column()
  public description: string;

  users: Array<UserEntity>;

  roles: Array<RoleEntity>;

  @BeforeInsert()
  generateUUID() {
    this.id = Tools.generateId();
  }
}
