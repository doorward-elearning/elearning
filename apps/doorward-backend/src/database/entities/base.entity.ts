import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import Tools from '@doorward/common/utils/Tools';

export default class BaseEntity {
  @PrimaryColumn({ nullable: false })
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = Tools.generateId();
  }

  @ManyToOne(() => OrganizationEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'organizationId',
  })
  organization: OrganizationEntity;
}
