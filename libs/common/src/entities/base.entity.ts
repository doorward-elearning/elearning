import {
  BeforeInsert,
  Connection,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectType,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Tools from '@doorward/common/utils/Tools';
import { Expose } from 'class-transformer';

export default class BaseEntity {
  @PrimaryColumn({ nullable: false })
  public id: string;

  @CreateDateColumn()
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

  getRepository<Entity>(connection: Connection, model: ObjectType<Entity>) {
    return connection.getRepository<Entity>(model);
  }
}
