import BaseOrganizationEntity from './base.organization.entity';
import { Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import CourseEntity from './course.entity';

@Entity('CourseManagers')
export default class CourseManagerEntity extends BaseOrganizationEntity {
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  manager: UserEntity;

  @ManyToOne(() => CourseEntity, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  creator: UserEntity;
}
