import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { CourseStatus } from '@doorward/common/types/courses';
import UserEntity from './user.entity';

@Entity('Courses')
export default class CourseEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  objectives: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'text' })
  status: CourseStatus;

  @OneToMany(() => UserEntity, (user) => user.authoredCourses, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  author: UserEntity;
}
