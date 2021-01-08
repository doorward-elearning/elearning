import { EntityRepository, Not } from 'typeorm';
import ChatMessageActivityEntity from '@doorward/common/entities/chat.message.activity.entity';
import ModelRepository from '@doorward/backend/repositories/model.repository';
import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';
import { MessageStatus } from '@doorward/chat/types';

@EntityRepository(ChatMessageActivityEntity)
export default class ChatMessageActivityRepository extends ModelRepository<ChatMessageActivityEntity> {
  public async findOrCreateActivity(messageId: string, userId: string) {
    let activity = await this.findOne({
      where: {
        user: { id: userId },
        message: { id: messageId },
      },
    });

    if (!activity) {
      activity = await this.createAndSave({ message: { id: messageId }, user: { id: userId } });
    }
    return activity;
  }

  public async messageDeliveredToUser(messageId: string, userId: string) {
    const activity = await this.findOne({
      where: {
        user: { id: userId },
        message: { id: messageId },
        deliveredAt: Not(null),
      },
    });
    return !!activity;
  }

  public async userHasRead(messageId: string, userId: string) {
    const activity = await this.findOne({
      where: {
        user: { id: userId },
        message: { id: messageId },
        readAt: Not(null),
      },
    });
    return !!activity;
  }

  public async readMessage(messageId: string, userId: string) {
    const messageRepository = this.getRepository(ChatMessageEntity);
    const message = await messageRepository.findOne({
      where: { id: messageId, sender: { id: Not(userId) } },
    });

    if (message && message.status === MessageStatus.DELIVERED) {
      const activity = await this.findOrCreateActivity(messageId, userId);
      if (!activity.readAt) {
        activity.readAt = new Date();

        message.numRead = message.numRead + 1;

        if (message.numRead === message.numRecipients) {
          message.status = MessageStatus.READ;
        }

        await messageRepository.save(message);

        await this.save(activity);

        return message;
      }
    }
  }

  public async deliverMessage(messageId: string, userId: string) {
    const messageRepository = this.getRepository(ChatMessageEntity);
    const message = await messageRepository.findOne({
      where: { id: messageId, sender: { id: Not(userId) } },
    });
    if (message && message.status === MessageStatus.SENT) {
      const activity = await this.findOrCreateActivity(messageId, userId);
      if (!activity.deliveredAt) {
        activity.deliveredAt = new Date();

        message.numDelivered = message.numDelivered + 1;

        if (message.numDelivered === message.numRecipients) {
          message.status = MessageStatus.DELIVERED;
        }

        await messageRepository.save(message);

        await this.save(activity);

        return message;
      }
    }
  }
}
