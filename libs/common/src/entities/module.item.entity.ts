import BaseEntity from './base.entity';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne, TableInheritance } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from './module.entity';
import UserEntity from './user.entity';
import FileEntity from '@doorward/common/entities/file.entity';

@Entity('ModuleItems')
@TableInheritance({
  column: {
    type: 'enum',
    enum: ModuleItemType,
  },
})
export default class ModuleItemEntity extends BaseEntity {
  @Column()
  title: string;

  // Keep this to prevent migration types from failing
  content?: string;

  @OneToOne(() => FileEntity, {
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  file: FileEntity;

  @Column({ type: 'enum', enum: ModuleItemType })
  type: ModuleItemType;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => ModuleEntity, (module) => module.items, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  module: Promise<ModuleEntity> | ModuleEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'createdBy' })
  author: UserEntity;

  courseId?: string;

  moduleId?: string;

  @AfterLoad()
  async populateModuleAndCourse() {
    this.moduleId = (await this.module)?.id;
    this.courseId = (await (await this.module)?.course)?.id;
  }
}
