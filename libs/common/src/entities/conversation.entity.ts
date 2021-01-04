import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import GroupEntity from '@doorward/common/entities/group.entity';
import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';
import UserEntity from '@doorward/common/entities/user.entity';

@Entity('Conversations')
export default class ConversationEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  avatar: string;

  @Column({ default: true })
  directMessage: boolean;

  @OneToOne(() => GroupEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  group: GroupEntity;

  @OneToMany(() => ChatMessageEntity, (message) => message.conversation, { onDelete: 'CASCADE' })
  messages: Array<ChatMessageEntity>;

  recipient: UserEntity;
}
