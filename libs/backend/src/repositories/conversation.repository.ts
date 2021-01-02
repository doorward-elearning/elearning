import ModelRepository from '@doorward/backend/repositories/model.repository';
import ConversationEntity from '@doorward/common/entities/conversation.entity';
import { EntityRepository } from 'typeorm';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import UserEntity from '@doorward/common/entities/user.entity';

@EntityRepository(ConversationEntity)
export default class ConversationRepository extends ModelRepository<ConversationEntity> {
  async getConversationsForUser(id: string) {
    return this.createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.group', 'group')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('group.members', 'member')
      .leftJoinAndSelect('message.sender', 'sender')
      .where('member."userId" = :id', { id })
      .leftJoin(
        (qb) => qb.select().from(GroupMemberEntity, 'groupMember'),
        'recipientGroupMember',
        '"recipientGroupMember"."groupId" = group.id AND "recipientGroupMember"."userId" != :id',
        { id }
      )
      .leftJoinAndMapOne(
        'conversation.recipient',
        UserEntity,
        'recipient',
        '"recipientGroupMember"."userId" = recipient.id'
      )
      .getMany();
  }
}
