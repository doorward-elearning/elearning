import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

@Entity('Files')
export default class FileEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false })
  public: boolean;

  @Column({ nullable: false })
  publicUrl: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity;

  @ManyToOne(() => ModuleItemEntity, (item) => item.files, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  moduleItem: ModuleItemEntity;
}
