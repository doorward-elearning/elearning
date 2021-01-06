import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatMessageBody, ChatMessageTypes } from '@doorward/chat/chat.message.types';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageStatus } from '@doorward/chat/types';
import ConversationEntity from '@doorward/common/entities/conversation.entity';
import ChatMessageEntity from '@doorward/common/entities/chat.message.entity';

@WebSocketGateway({ transports: ['websocket'] })
export default class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage(ChatMessageTypes.INITIALIZE)
  async onJoinChat(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.INITIALIZE],
    @ConnectedSocket() client: Socket
  ) {
    const conversations = await this.chatService.getAllConversationsForUser(body.userId);

    conversations.forEach((conversation) => {
      client.join(conversation.id);
      client.join(body.userId);
    });
  }

  @SubscribeMessage(ChatMessageTypes.READ_REPORT)
  async onReadReport(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.READ_REPORT],
    @ConnectedSocket() client: Socket
  ) {
    if (body.messageId) {
      await this.chatService.readMessage(client, body.conversationId, body.messageId, body.userId);
    } else {
      this.chatService.readMessages(body.userId, client, body.conversationId).then();
    }
  }

  @SubscribeMessage(ChatMessageTypes.DELIVERY_REPORT)
  async onDeliveryReport(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.DELIVERY_REPORT],
    @ConnectedSocket() client: Socket
  ) {
    if (body.messageId) {
      await this.chatService.deliverMessage(client, body.conversationId, body.messageId, body.userId, body.messageRead);
    } else {
      this.chatService.deliverMessages(body.userId, client, body.messageRead, body.conversationId).then();
    }
  }

  @SubscribeMessage(ChatMessageTypes.REGISTER_CONVERSATION)
  async registerUserToConversation(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.REGISTER_CONVERSATION],
    @ConnectedSocket() client: Socket
  ) {
    const conversation = await this.chatService.getConversationByUser(body.conversationId, body.userId);
    if (conversation) {
      client.join(conversation.id);

      const undeliveredMessages = await this.chatService.getUndeliveredMessages(conversation.id, body.userId);

      undeliveredMessages.forEach((message) => {
        ChatGateway.sendNewMessage(this.server, conversation, message, body.userId);
      });
    }
  }

  @SubscribeMessage(ChatMessageTypes.SEND_MESSAGE)
  async sendMessage(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.SEND_MESSAGE],
    @ConnectedSocket() client: Socket
  ) {
    let conversation = await this.chatService.getConversationByUser(body.conversationId, body.userId);
    const currentUser = await this.chatService.getUser(body.userId);

    let newConversation = false;
    if (!conversation) {
      newConversation = true;
      conversation = await this.chatService.createNewConversation(
        body.userId,
        body.recipientId,
        body.conversationId,
        body.directMessage
      );
      // ensure all members are listening to this group
      const newMembers = await this.chatService.getAllRecipients(conversation.id);

      await Promise.all(
        newMembers.map(async (member) => {
          const conversationInfo = await this.chatService.getConversationInfo(conversation, member.member, currentUser);
          if (member.member.id !== body.userId) {
            client.to(member.member.id).emit(ChatMessageTypes.NEW_CONVERSATION, conversationInfo);
          }
        })
      );

      client.join(conversation.id);
    }

    const message = await this.chatService.newMessage(conversation.id, body.userId, body.message, body.messageId);

    if (!newConversation) {
      ChatGateway.sendNewMessage(client, conversation, message);
    }

    client.emit(ChatMessageTypes.MESSAGE_CHANGED, {
      id: message.id,
      status: MessageStatus.SENT,
    });
  }

  private static sendNewMessage(
    client: Socket | Server,
    conversation: ConversationEntity,
    message: ChatMessageEntity,
    to?: string
  ) {
    client.to(to || conversation.id).emit(ChatMessageTypes.NEW_MESSAGE, {
      conversationId: conversation.id,
      text: message.text,
      timestamp: new Date(),
      status: MessageStatus.SENT,
      me: false,
      id: message.id,
      sender: {
        ...message.sender,
        fullName: message.sender.fullName,
      },
    });
  }
}
