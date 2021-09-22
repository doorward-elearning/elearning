import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class ChatMessageRepository extends MultiOrganizationRepository<ChatMessageEntity> {
  getEntity(): ObjectType<ChatMessageEntity> {
    return ChatMessageEntity;
  }
}
