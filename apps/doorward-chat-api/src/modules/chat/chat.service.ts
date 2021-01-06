import { Injectable } from '@nestjs/common';
import ConversationRepository from '@doorward/backend/repositories/conversation.repository';
import _ from 'lodash';
import moment from 'moment';
import ChatMessageRepository from '@doorward/backend/repositories/chat.message.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { GroupsService } from '@doorward/backend/modules/groups/groups.service';
import { ChatMessage, Conversation, MessageBlock, MessageStatus } from '@doorward/chat/types';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import ConversationEntity from '@doorward/common/entities/conversation.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';
import { In, Not } from 'typeorm';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageTypes } from '@doorward/chat/chat.message.types';
import ChatMessageActivityRepository from '@doorward/backend/repositories/chat.message.activity.repository';
import translate from '@doorward/common/lang/translate';

@Injectable()
export class ChatService {
  @WebSocketServer()
  server: Server;

  constructor(
    private conversationRepository: ConversationRepository,
    private messageRepository: ChatMessageRepository,
    private userRepository: UsersRepository,
    private groupService: GroupsService,
    private groupsRepository: GroupsRepository,
    private activityRepository: ChatMessageActivityRepository
  ) {}

  /**
   *
   * @param userId
   */
  async getAllConversationsForUser(userId: string) {
    return this.conversationRepository.getConversationsForUser(userId);
  }

  async getAllRecipients(conversationId: string) {
    const conversation = await this.conversationRepository.findOne(conversationId, {
      relations: ['group', 'group.members', 'group.members.member'],
    });

    return conversation.group.members;
  }

  /**
   *
   * @param userId
   */
  async getUser(userId: string) {
    return this.userRepository.findOne(userId);
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
   * Get messages that were not delivered to the current user
   *
   * @param conversationId
   * @param currentUser
   */
  async getUndeliveredMessages(conversationId: string, currentUser: string) {
    return this.messageRepository.find({
      where: {
        conversation: { id: conversationId },
        status: MessageStatus.SENT,
        sender: {
          id: Not(currentUser),
        },
      },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  /**
   *
   * @param senderId
   * @param recipientId
   * @param conversationId
   * @param directMessage
   */
  async createNewConversation(senderId: string, recipientId: string, conversationId: string, directMessage?: boolean) {
    const creator = await this.userRepository.findOne(senderId);
    let group;
    let title;
    let avatar = '';

    if (directMessage) {
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

      group = await this.groupService.createGroup(
        {
          name: groupName,
          type: 'DirectMessage',
          members: [senderId, recipientId],
        },
        creator
      );

      title = creator.fullName + ' and ' + recipient.fullName;
      avatar = recipient.profilePicture || '';
    } else {
      const existing = await this.groupsRepository.findOne(recipientId, { relations: ['members', 'members.member'] });

      group = await this.groupService.createGroup(
        {
          name: existing.name,
          type: 'ChatGroup',
          members: [...existing.members.map((member) => member.member.id), creator.id],
        },
        creator,
        false
      );

      title = group.name;
    }

    const conversation = await this.conversationRepository.createAndSave({
      id: conversationId,
      title,
      avatar,
      group,
      directMessage,
    });

    if (directMessage) {
      conversation.recipient = await this.userRepository.findOne(recipientId);
    }

    return conversation;
  }

  async updateMessage(messageId: string, data: QueryDeepPartialEntity<ChatMessageEntity>) {
    return this.messageRepository.update(messageId, data);
  }

  /**
   *
   * @param messageId
   */
  async getMessageById(messageId: string) {
    return this.messageRepository.findOne(messageId);
  }

  async deliverMessage(
    client: Socket,
    conversationId: string,
    messageId: string,
    userId: string,
    readMessage?: boolean
  ) {
    const message = await this.activityRepository.deliverMessage(messageId, userId);

    if (message) {
      client.to(conversationId).emit(ChatMessageTypes.MESSAGE_CHANGED, {
        status: message.status,
        id: message.id,
      });

      if (readMessage) {
        await this.readMessage(client, conversationId, messageId, userId);
      }
    }
  }

  async readMessage(client: Socket, conversationId: string, messageId: string, userId: string) {
    const message = await this.activityRepository.readMessage(messageId, userId);

    if (message) {
      client.to(conversationId).emit(ChatMessageTypes.MESSAGE_CHANGED, {
        status: message.status,
        id: message.id,
      });
    }
  }

  /**
   *
   * @param userId
   * @param client
   * @param conversationIds
   */
  async readMessages(userId: string, client: Socket, ...conversationIds: Array<string>) {
    if (conversationIds?.length) {
      const messages = await this.messageRepository.find({
        where: {
          conversation: {
            id: In(conversationIds),
          },
          status: MessageStatus.DELIVERED,
          sender: {
            id: Not(userId),
          },
        },
        relations: ['conversation'],
      });

      if (messages?.length) {
        return Promise.all(
          messages.map(async (message) => {
            await this.readMessage(client, message.conversation.id, message.id, userId);
          })
        );
      }
    }
  }

  /**
   *
   * @param userId
   * @param client
   * @param read
   * @param conversationIds
   */
  async deliverMessages(userId: string, client: Socket, read?: boolean, ...conversationIds: Array<string>) {
    if (conversationIds?.length) {
      const messages = await this.messageRepository.find({
        where: {
          conversation: {
            id: In(conversationIds),
          },
          status: MessageStatus.SENT,
        },
        relations: ['conversation'],
      });

      if (messages?.length) {
        return Promise.all(
          messages.map(async (message) => {
            await this.deliverMessage(client, message.conversation.id, message.id, userId, read);
          })
        );
      }
    }
  }

  /**
   *
   * @param conversationId
   * @param senderId
   * @param messageText
   * @param messageId
   */
  async newMessage(conversationId: string, senderId: string, messageText: string, messageId: string) {
    const numRecipients = await this.conversationRepository.getNumberOfRecipients(conversationId);

    const sender = await this.userRepository.findOne(senderId);

    return this.messageRepository.createAndSave({
      id: messageId,
      status: MessageStatus.SENT,
      text: messageText,
      numRecipients: numRecipients - 1,
      conversation: {
        id: conversationId,
      },
      sender,
    });
  }

  async getConversations(currentUser: UserEntity): Promise<Array<Conversation>> {
    const conversations = await this.conversationRepository.getConversationsForUser(currentUser.id);

    const conversationResponse = await Promise.all(
      conversations.map((conversation) => this.getConversationInfo(conversation, currentUser))
    );

    return conversationResponse.sort((a, b) => moment(b.lastMessageTimestamp).diff(moment(a.lastMessageTimestamp)));
  }

  createConversationBlocks(conversation: ConversationEntity, currentUser: UserEntity): Array<MessageBlock> {
    const blocks: Record<string, ChatMessage[]> = {};
    [...(conversation.messages || [])].forEach((message) => {
      const day = moment(message.createdAt).format('MM/DD/YYYY');
      const chatMessage = {
        ...message,
        timestamp: message.createdAt,
        me: message.sender.id === currentUser.id,
        id: message.id,
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

  async getConversationInfo(
    conversation: ConversationEntity,
    currentUser: UserEntity,
    recipient?: UserEntity
  ): Promise<Conversation> {
    let title, avatar;
    const _recipient = recipient || conversation.recipient;

    if (conversation.directMessage) {
      title = _recipient.fullName;
      avatar = _recipient.profilePicture;
    } else {
      title = conversation.group.name;
      avatar = conversation.avatar;
    }

    const blocks = this.createConversationBlocks(conversation, currentUser);
    const recipients = await this.getAllRecipients(conversation.id);

    return {
      id: conversation.id,
      recipient: conversation.directMessage ? _recipient : conversation.group,
      title,
      avatar,
      blocks,
      directMessage: conversation.directMessage,
      lastMessageTimestamp: conversation.messages?.length
        ? conversation.messages[conversation.messages.length - 1]?.createdAt
        : new Date(),
      recipientsList: recipients
        .sort((a, b) => {
          if (a.member.id === currentUser.id) {
            return -1;
          }
          return a.member.fullName > b.member.fullName ? 1 : -1;
        })
        .map((recipient) => {
          if (currentUser.id === recipient.member.id) {
            return _.capitalize(translate('you'));
          } else {
            return recipient.member.fullName;
          }
        })
        .join(' , '),
    };
  }
}
