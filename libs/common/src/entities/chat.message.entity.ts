import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { MessageStatus } from '@doorward/chat/types';
import ConversationEntity from '@doorward/common/entities/conversation.entity';
import UserEntity from '@doorward/common/entities/user.entity';

@Entity('ChatMessages')
export default class ChatMessageEntity extends BaseEntity {
  @Column()
  text: string;

  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.SENDING })
  status: MessageStatus;

  @ManyToOne(() => ConversationEntity)
  conversation: ConversationEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  sender: UserEntity;
}
