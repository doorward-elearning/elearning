import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseOrganizationEntity from './base.organization.entity';
import CourseEntity from './course.entity';
import ModuleItemEntity from './module.item.entity';

@Entity('Modules')
export default class ModuleEntity extends BaseOrganizationEntity {
  @Column({ type: 'text' })
  description: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => CourseEntity, (course) => course.modules, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  @OneToMany(() => ModuleItemEntity, (moduleItem) => moduleItem.module)
  items: Array<ModuleItemEntity>;
}
