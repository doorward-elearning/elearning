import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CourseStatus } from '@doorward/common/types/courses';
import UserEntity from './user.entity';
import ModuleEntity from './module.entity';
import MeetingRoomEntity from './meeting.room.entity';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('Courses')
export default class CourseEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  objectives: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.DRAFT })
  status: CourseStatus;

  @OneToOne(() => MeetingRoomEntity, (meetingRoom) => meetingRoom.course, {
    nullable: true,
  })
  @JoinColumn({
    name: 'meetingRoomId',
  })
  meetingRoom: MeetingRoomEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  author: UserEntity;

  @OneToMany(() => ModuleEntity, (module) => module.course, {
    cascade: true,
  })
  modules: Array<ModuleEntity>;

  @OneToMany(() => StudentCoursesEntity, (studentCourse) => studentCourse.course, {
    cascade: true,
  })
  studentCourses: Array<StudentCoursesEntity>;

  @OneToMany(() => DiscussionGroupEntity, (discussionGroup) => discussionGroup.course)
  discussionGroups: Array<DiscussionGroupEntity>;

  managers: Array<UserEntity>;

  students: Array<UserEntity>;

  numStudents: number;

  itemsCount: Partial<{
    [ModuleItemType.PAGE]: number;
    [ModuleItemType.FILE]: number;
    [ModuleItemType.ASSIGNMENT]: number;
    [AssessmentTypes.QUIZ]: number;
    [AssessmentTypes.EXAM]: number;
  }>;
}
