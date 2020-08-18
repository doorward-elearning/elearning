import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  darkThemeIcon: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  users: Array<UserEntity>;

  roles: Array<RoleEntity>;

  @BeforeInsert()
  generateUUID() {
    this.id = Tools.generateId();
  }
}
