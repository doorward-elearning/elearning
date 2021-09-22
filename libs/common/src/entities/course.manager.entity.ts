import { Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import CourseEntity from './course.entity';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('CourseManagers')
export default class CourseManagerEntity extends BaseEntity {
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
