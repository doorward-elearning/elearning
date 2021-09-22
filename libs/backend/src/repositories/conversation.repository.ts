import ConversationEntity from '@doorward/common/entities/conversation.entity';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class ConversationRepository extends MultiOrganizationRepository<ConversationEntity> {
  /**
   *
   * @param userId
   * @param conversationIds
   */
  async getConversationsForUser(userId: string, conversationIds?: Array<string>) {
    const queryBuilder = this.createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.group', 'group')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('group.members', 'member')
      .leftJoinAndSelect('message.sender', 'sender')
      .addOrderBy('message."createdAt"', 'ASC')
      .where('member."userId" = :id', { id: userId })
      .leftJoin(
        (qb) => qb.select().from(GroupMemberEntity, 'groupMember'),
        'recipientGroupMember',
        '"recipientGroupMember"."groupId" = group.id AND "recipientGroupMember"."userId" != :id',
        { id: userId }
      )
      .leftJoinAndMapOne(
        'conversation.recipient',
        UserEntity,
        'recipient',
        '"recipientGroupMember"."userId" = recipient.id'
      );
    if (conversationIds?.length) {
      queryBuilder.andWhereInIds(conversationIds);
    }

    return queryBuilder.getMany();
  }

  /**
   *
   * @param conversationId
   */
  async getNumberOfRecipients(conversationId: string) {
    const queryBuilder = this.createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.group', 'group')
      .leftJoinAndSelect('group.members', 'member')
      .where('conversation.id = :id', { id: conversationId });

    const conversation = await queryBuilder.getOne();

    return conversation?.group?.members?.length || 0;
  }

  getEntity(): ObjectType<ConversationEntity> {
    return ConversationEntity;
  }
}
