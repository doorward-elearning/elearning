import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CourseStatus } from '@doorward/common/types/courses';
import UserEntity from './user.entity';
import ModuleEntity from './module.entity';
import StudentCoursesEntity from './student.courses.entity';
import MeetingRoomEntity from './meeting.room.entity';

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

  @Column({ type: 'enum', enum: CourseStatus })
  status: CourseStatus;

  @OneToOne(() => MeetingRoomEntity, (meetingRoom) => meetingRoom.course, {
    nullable: true,
  })
  @JoinColumn({
    name: 'meetingRoomId',
  })
  meetingRoom: MeetingRoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.authoredCourses, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  author: UserEntity;

  @OneToMany(() => ModuleEntity, (module) => module.course)
  modules: Array<ModuleEntity>;

  @OneToMany(() => StudentCoursesEntity, (studentCourse) => studentCourse.course)
  students: Array<StudentCoursesEntity>;
}
