import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  getConnectionManager,
  ObjectType,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tools from '@doorward/common/utils/Tools';
import { Expose } from 'class-transformer';
import BaseModel from '@doorward/common/models/base.model';

export default class BaseEntity implements BaseModel {
  @PrimaryColumn({ nullable: false })
  public id: string;

  @CreateDateColumn()
  @Expose({ groups: ['timestamps'] })
  public createdAt: Date;

  @UpdateDateColumn()
  @Expose({ groups: ['timestamps'] })
  public updatedAt: Date;

  @DeleteDateColumn()
  @Expose({ groups: ['timestamps'] })
  public deletedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = Tools.generateId();
    }
  }

  getConnection() {
    return getConnectionManager().get();
  }

  getRepository<Entity>(model: ObjectType<Entity>) {
    return this.getConnection().getRepository<Entity>(model);
  }
}
