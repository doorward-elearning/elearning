import { Injectable } from '@nestjs/common';
import ConversationRepository from '@doorward/backend/repositories/conversation.repository';
import moment from 'moment';
import ChatMessageRepository from '@doorward/backend/repositories/chat.message.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { GroupsService } from '@doorward/backend/modules/groups/groups.service';
import { ChatMessage, Conversation, MessageBlock, MessageStatus } from '@doorward/chat/types';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import ConversationEntity from '@doorward/common/entities/conversation.entity';

@Injectable()
export class ChatService {
  constructor(
    private conversationRepository: ConversationRepository,
    private messageRepository: ChatMessageRepository,
    private userRepository: UsersRepository,
    private groupService: GroupsService,
    private groupsRepository: GroupsRepository
  ) {}

  /**
   *
   * @param userId
   */
  async getAllConversationsForUser(userId: string) {
    return this.conversationRepository.getConversationsForUser(userId);
  }

  /**
   *
   * @param id
   * @param userId
   */
  async getConversationByUser(id: string, userId: string) {
    const conversations = await this.conversationRepository.getConversationsForUser(userId, [id]);

    return conversations?.length ? conversations[0] : null;
  }

  /**
   *
   * @param senderId
   * @param recipientId
   */
  async createNewConversation(senderId: string, recipientId: string) {
    const creator = await this.userRepository.findOne(senderId);
    const recipient = await this.userRepository.findOne(recipientId);

    const groupName = creator.id + recipient.id;

    if (await this.groupsRepository.checkGroupExists(groupName)) {
      return await this.conversationRepository.findOne({
        where: {
          group: {
            name: groupName,
          },
        },
      });
    }

    const group = await this.groupService.createGroup(
      {
        name: groupName,
        type: 'DirectMessage',
        members: [senderId, recipientId],
      },
      creator
    );

    return await this.conversationRepository.createAndSave({
      title: creator.fullName + ' and ' + recipient.fullName,
      avatar: '',
      group,
    });
  }

  /**
   *
   * @param conversationId
   * @param senderId
   * @param messageText
   */
  async newMessage(conversationId: string, senderId: string, messageText: string) {
    return this.messageRepository.createAndSave({
      status: MessageStatus.SENT,
      text: messageText,
      conversation: {
        id: conversationId,
      },
      sender: {
        id: senderId,
      },
    });
  }

  async getConversations(currentUser: UserEntity): Promise<Array<Conversation>> {
    const conversations = await this.conversationRepository.getConversationsForUser(currentUser.id);

    return Promise.all(conversations.map((conversation) => this.getConversationInfo(conversation, currentUser)));
  }

  createConversationBlocks(conversation: ConversationEntity, currentUser: UserEntity): Array<MessageBlock> {
    const blocks: Record<string, ChatMessage[]> = {};
    conversation.messages.forEach((message) => {
      const day = moment(message.createdAt).format('MM/DD/YYYY');
      const chatMessage = {
        ...message,
        timestamp: message.createdAt,
        me: message.sender.id === currentUser.id,
      };

      if (blocks[day]) {
        blocks[day].push(chatMessage);
      } else {
        blocks[day] = [chatMessage];
      }
    });

    return Object.keys(blocks)
      .sort((a, b) => (moment(a, 'MM/DD/YYYY').isAfter(moment(b, 'MM/DD/YYYY')) ? 1 : -1))
      .map((day) => {
        return {
          day: blocks[day][0].timestamp,
          messages: blocks[day],
        };
      });
  }

  async getConversationInfo(conversation: ConversationEntity, currentUser: UserEntity): Promise<Conversation> {
    const recipient = conversation.recipient;
    const title = recipient.fullName;
    const avatar = recipient.profilePicture;

    const blocks = this.createConversationBlocks(conversation, currentUser);

    return {
      id: conversation.id,
      recipient,
      title,
      avatar,
      blocks,
    };
  }
}
