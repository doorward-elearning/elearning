import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatMessageBody, ChatMessageTypes } from '@doorward/chat/chat.message.types';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageStatus } from '@doorward/chat/types';

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
    });
  }

  @SubscribeMessage(ChatMessageTypes.READ_REPORT)
  async onReadReport(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.READ_REPORT],
    @ConnectedSocket() client: Socket
  ) {
    if (body.messageId) {
      await this.chatService.updateMessage(body.messageId, {
        readAt: body.timestamp,
        status: MessageStatus.READ,
      });

      client.to(body.conversationId).emit(ChatMessageTypes.READ_REPORT, body);
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
      await this.chatService.updateMessage(body.messageId, {
        deliveredAt: body.timestamp,
        status: MessageStatus.DELIVERED,
      });

      client.to(body.conversationId).emit(ChatMessageTypes.DELIVERY_REPORT, body);
    } else {
      this.chatService.deliverMessages(client, body.conversationId).then();
    }
  }

  @SubscribeMessage(ChatMessageTypes.SEND_MESSAGE)
  async sendMessage(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.SEND_MESSAGE],
    @ConnectedSocket() client: Socket
  ) {
    let conversation = await this.chatService.getConversationByUser(body.conversationId, body.userId);
    if (!conversation) {
      conversation = await this.chatService.createNewConversation(body.userId, body.recipientId, body.conversationId);
    }
    const message = await this.chatService.newMessage(conversation.id, body.userId, body.message, body.messageId);

    client.to(conversation.id).emit(ChatMessageTypes.NEW_MESSAGE, {
      conversationId: conversation.id,
      text: message.text,
      timestamp: new Date(),
      status: MessageStatus.SENT,
      me: false,
      id: message.id,
    });

    client.emit(ChatMessageTypes.SENT_REPORT, {
      conversationId: conversation.id,
      messageId: message.id,
    });
  }
}
