import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import CourseEntity from './course.entity';
import ModuleItemEntity from './module.item.entity';

@Entity('Modules')
export default class ModuleEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => CourseEntity, (course) => course.modules, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  course: Promise<CourseEntity> | CourseEntity;

  @OneToMany(() => ModuleItemEntity, (moduleItem) => moduleItem.module)
  items?: Array<ModuleItemEntity>;

  @Column()
  courseId?: string;
}
