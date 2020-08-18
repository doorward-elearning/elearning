import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from '@doorward/common/types/genders';
import { UserStatus } from '@doorward/common/types/users';
import { OrganizationEntity } from './organization.entity';
import UserRolesEntity from './user.roles.entity';
import CourseEntity from './course.entity';
import StudentCoursesEntity from './student.courses.entity';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import GroupEntity from './group.entity';
import GroupMemberEntity from './group.member.entity';

@Entity('Users')
export default class UserEntity extends BaseOrganizationEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true})
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true})
  zipCode: string;

  @Column({ nullable: true})
  country: string;

  @Column({ nullable: true})
  city: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ default: UserStatus.PENDING_ACTIVATION })
  status: string;

  @OneToMany(() => UserRolesEntity, (userRoles) => userRoles.user)
  roles: Array<UserRolesEntity>;

  @OneToMany(() => CourseEntity, (course) => course.author)
  authoredCourses: Array<CourseEntity>;

  @OneToMany(() => StudentCoursesEntity, (studentCourse) => studentCourse.student)
  courses: Array<StudentCoursesEntity>;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  meetingRooms: Array<MeetingRoomMemberEntity>;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.host)
  meetings: Array<MeetingEntity>;

  @OneToMany(() => GroupEntity, (group) => group.author)
  authoredGroups: Array<GroupEntity>;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.member)
  groups: Array<GroupMemberEntity>;
}
