import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import UserEntity from './user.entity';
import GroupMemberEntity from './group.member.entity';

@Entity('Groups')
export default class GroupEntity extends BaseOrganizationEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.authoredGroups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'createdBy',
  })
  author: UserEntity;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group)
  members: Array<GroupMemberEntity>;
}
