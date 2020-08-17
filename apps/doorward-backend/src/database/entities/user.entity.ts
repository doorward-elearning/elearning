import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from '@doorward/common/types/genders';
import { UserStatus } from '@doorward/common/types/users';
import { OrganizationEntity } from './organization.entity';
import UserRolesEntity from './user.roles.entity';
import CourseEntity from './course.entity';
import StudentCoursesEntity from './student.courses.entity';
import MeetingRoomMemberEntity from './meeting.room.member.entity';

@Entity('Users')
export default class UserEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ default: UserStatus.PENDING_ACTIVATION })
  status: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.users, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  organization: OrganizationEntity;

  @OneToMany(() => UserRolesEntity, (userRoles) => userRoles.user)
  roles: Array<UserRolesEntity>;

  @OneToMany(() => CourseEntity, (course) => course.author)
  authoredCourses: Array<CourseEntity>;

  @OneToMany(() => StudentCoursesEntity, (studentCourse) => studentCourse.student)
  courses: Array<StudentCoursesEntity>;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  meetingRooms: Array<MeetingRoomMemberEntity>;
}
