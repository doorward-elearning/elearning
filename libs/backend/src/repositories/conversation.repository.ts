import ModelRepository from '@doorward/backend/repositories/model.repository';
import ConversationEntity from '@doorward/common/entities/conversation.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(ConversationEntity)
export default class ConversationRepository extends ModelRepository<ConversationEntity> {}
