import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MessageStatus } from '@doorward/chat/types';
import ConversationEntity from '@doorward/common/entities/conversation.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import ChatMessageActivityEntity from '@doorward/common/entities/chat.message.activity.entity';

@Entity('ChatMessages')
export default class ChatMessageEntity extends BaseEntity {
  @Column()
  text: string;

  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.SENDING })
  status: MessageStatus;

  @ManyToOne(() => ConversationEntity, { onDelete: 'CASCADE' })
  conversation: ConversationEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  sender: UserEntity;

  @OneToMany(() => ChatMessageActivityEntity, (activity) => activity.message)
  activities: Array<ChatMessageActivityEntity>;

  @Column({ default: 0 })
  numRecipients: number;

  @Column({ default: 0 })
  numDelivered: number;

  @Column({ default: 0 })
  numRead: number;
}
