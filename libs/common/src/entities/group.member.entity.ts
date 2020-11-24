import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GroupRoles } from '@doorward/common/types/groups';
import UserEntity from './user.entity';
import GroupEntity from './group.entity';
import GroupMemberModel  from '@doorward/common/models/group.member.model';

@Entity({
  name: 'GroupMembers',
})
export default class GroupMemberEntity extends BaseOrganizationEntity implements GroupMemberModel {
  @Column({ type: 'enum', enum: GroupRoles, default: GroupRoles.MEMBER })
  role: GroupRoles;

  @ManyToOne(() => UserEntity, (user) => user.groups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  member: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.members, {
    onDelete: 'CASCADE',
  })
  group: GroupEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'addedBy',
  })
  referee: UserEntity;
}
