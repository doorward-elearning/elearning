import ModelRepository from '@doorward/backend/repositories/model.repository';
import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ChatMessageEntity)
export default class ChatMessageRepository extends ModelRepository<ChatMessageEntity> {}
