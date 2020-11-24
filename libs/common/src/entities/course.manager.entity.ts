import BaseOrganizationEntity from './base.organization.entity';
import { Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import CourseEntity from './course.entity';
import CourseManagerModel from '@doorward/common/models/course.manager.model';

@Entity('CourseManagers')
export default class CourseManagerEntity extends BaseOrganizationEntity implements CourseManagerModel{
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  manager: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.managers, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  creator: UserEntity;
}
