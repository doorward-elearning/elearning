import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseOrganizationEntity from './base.organization.entity';
import CourseEntity from './course.entity';
import ModuleItemEntity from './module.item.entity';
import ModuleModel  from '@doorward/common/models/module.model';

@Entity('Modules')
export default class ModuleEntity extends BaseOrganizationEntity implements ModuleModel {
  @Column({ type: 'text', nullable: true })
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
