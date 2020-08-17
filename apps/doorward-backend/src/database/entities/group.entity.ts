import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import { OrganizationEntity } from './organization.entity';
import GroupMemberEntity from './group.member.entity';

@Entity('Groups')
export default class GroupEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.authoredGroups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'createdBy',
  })
  author: UserEntity;

  @ManyToOne(() => OrganizationEntity, {
    onDelete: 'CASCADE',
  })
  organization: OrganizationEntity;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group)
  members: Array<GroupMemberEntity>;
}
