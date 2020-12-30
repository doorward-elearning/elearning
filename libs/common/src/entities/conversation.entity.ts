import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import GroupEntity from '@doorward/common/entities/group.entity';

@Entity('Conversation')
export default class ConversationEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  avatar: string;

  @Column({ default: true })
  directMessage: boolean;

  @Column(() => GroupEntity)
  group: GroupEntity;
}
