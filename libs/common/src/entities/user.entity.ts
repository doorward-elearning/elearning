import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from '@doorward/common/types/genders';
import { UserStatus } from '@doorward/common/types/users';
import MeetingRoomMemberEntity from './meeting.room.member.entity';
import MeetingEntity from './meeting.entity';
import GroupMemberEntity from './group.member.entity';
import { Roles } from '@doorward/common/types/roles';
import RoleEntity from './role.entity';
import { Exclude, Expose } from 'class-transformer';
import PasswordUtils from '@doorward/backend/utils/PasswordUtils';
import PasswordsResetsEntity from '@doorward/common/entities/passwords.resets.entity';
import wildcardPattern from '@doorward/common/utils/wildcardPattern';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import CourseEntity from '@doorward/common/entities/course.entity';
import FileEntity from '@doorward/common/entities/file.entity';

@Entity('Users')
export default class UserEntity extends BaseOrganizationEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  profilePictureFileId: string;

  @Column({ nullable: true })
  @Expose({ groups: ['fullUserProfile'] })
  zipCode: string;

  @Column({ nullable: true })
  @Expose({ groups: ['fullUserProfile'] })
  country: string;

  @Column({ nullable: true })
  @Expose({ groups: ['fullUserProfile'] })
  city: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  @Expose({ groups: ['fullUserProfile'] })
  gender: Gender;

  @Column({ default: UserStatus.PENDING_ACTIVATION })
  status: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    eager: true,
  })
  @Expose({ groups: ['fullUserProfile'] })
  role: RoleEntity;

  @OneToMany(() => MeetingRoomMemberEntity, (meetingRoomMember) => meetingRoomMember.meetingRoom)
  meetingRooms: Array<MeetingRoomMemberEntity>;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.host)
  meetings: Array<MeetingEntity>;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.member)
  groups: Array<GroupMemberEntity>;

  @OneToMany(() => PasswordsResetsEntity, (passwordReset) => passwordReset.user)
  passwordResets: Array<PasswordsResetsEntity>;

  @ManyToOne(() => UserEntity, { nullable: true })
  @Expose({ groups: ['fullUserProfile'] })
  createdBy: UserEntity;

  @Expose()
  get fullName() {
    return (this.firstName || '') + ((this.firstName ? ' ' : '') + this.lastName || '') || this.username;
  }

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

  async updatePrivileges() {
    this.role.privileges = await this.getRepository(PrivilegeEntity)
      .createQueryBuilder('privilege')
      .leftJoin('RolePrivileges', 'rolePrivilege', 'privilege.id = "rolePrivilege"."privilegeId"')
      .where('"rolePrivilege"."roleId" = :roleId', { roleId: this.role.id })
      .getMany();
  }

  async hasPrivileges(...privileges: Array<string>): Promise<boolean> {
    if (!this.role.privileges) {
      await this.updatePrivileges();
    }
    return privileges.reduce((acc, privilege) => {
      return acc && this?.role?.privileges?.some((_privilege) => wildcardPattern(_privilege.name, privilege));
    }, true);
  }

  validatePassword(password: string): boolean {
    return PasswordUtils.verifyPassword(password, this.password);
  }

  courses: CourseEntity[];
}
