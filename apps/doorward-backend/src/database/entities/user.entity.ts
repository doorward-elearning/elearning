import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from '@doorward/common/types/genders';
import { UserStatus } from '@doorward/common/types/users';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import GroupMemberEntity from './group.member.entity';
import { Roles } from '@doorward/common/types/roles';
import RoleEntity from './role.entity';
import { Exclude } from 'class-transformer';
import Tools from '@doorward/common/utils/Tools';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';

@Entity('Users')
export default class UserEntity extends BaseOrganizationEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ default: UserStatus.PENDING_ACTIVATION })
  status: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    eager: true,
  })
  role: RoleEntity;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  meetingRooms: Array<MeetingRoomMemberEntity>;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.host)
  meetings: Array<MeetingEntity>;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.member)
  groups: Array<GroupMemberEntity>;

  isSuperAdmin() {
    return this.role?.name === Roles.SUPER_ADMINISTRATOR;
  }

  isStudent() {
    return this.role?.name === Roles.STUDENT;
  }

  isTeacher() {
    return this.role?.name === Roles.TEACHER;
  }

  hasRole(role: Roles) {
    return this.role?.name === role;
  }

  validatePassword(password: string): boolean {
    return PasswordUtils.verifyPassword(password, this.password);
  }
}
