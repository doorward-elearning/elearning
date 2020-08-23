import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import CourseEntity from './course.entity';
import { StudentCourseStatus } from '@doorward/common/types/courses';

@Entity('StudentCourses')
export default class StudentCoursesEntity extends BaseOrganizationEntity {
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  student: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.students, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  @Column({ type: 'enum', enum: StudentCourseStatus })
  status: StudentCourseStatus;
}
