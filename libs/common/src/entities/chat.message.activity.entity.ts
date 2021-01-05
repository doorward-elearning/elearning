import BaseEntity from '@doorward/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';
import UserEntity from '@doorward/common/entities/user.entity';


@Entity("ChatMessageActivityEntity")
export default class ChatMessageActivityEntity extends BaseEntity {

  @ManyToOne(() => ChatMessageEntity, { onDelete: 'CASCADE'})
  message: ChatMessageEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE'})
  user: UserEntity;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({ nullable: true })
  readAt: Date;
}
