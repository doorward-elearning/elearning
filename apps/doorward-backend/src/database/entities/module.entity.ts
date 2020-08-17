import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import CourseEntity from './course.entity';
import ModuleItemEntity from './module.item.entity';

@Entity('Modules')
export default class ModuleEntity extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column()
  title: string;

  @ManyToOne(() => CourseEntity, (course) => course.modules, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  @OneToMany(() => ModuleItemEntity, (moduleItem) => moduleItem.module)
  items: Array<ModuleItemEntity>;
}
