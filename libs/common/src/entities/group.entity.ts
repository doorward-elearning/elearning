import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import UserEntity from './user.entity';
import GroupMemberEntity from './group.member.entity';
import ConversationEntity from '@doorward/common/entities/conversation.entity';

@Entity('Groups')
export default class GroupEntity extends BaseOrganizationEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'createdBy',
  })
  author: UserEntity;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group, { onDelete: 'CASCADE' })
  members: Array<GroupMemberEntity>;

  @OneToOne(() => ConversationEntity, (conversation) => conversation.group, { onDelete: 'CASCADE' })
  conversation: ConversationEntity;
}
