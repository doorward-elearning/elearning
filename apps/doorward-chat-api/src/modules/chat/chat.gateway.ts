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
    console.log(conversations, body);

    conversations.forEach((conversation) => {
      client.join(conversation.id);
    });
  }

  @SubscribeMessage(ChatMessageTypes.SEND_MESSAGE_TO_NEW_CONVERSATION)
  async sendMessageToNewConversation(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.SEND_MESSAGE_TO_NEW_CONVERSATION],
    @ConnectedSocket() client: Socket
  ) {
    const conversation = await this.chatService.createNewConversation(body.userId, body.recipientId);

    const message = await this.chatService.newMessage(conversation.id, body.userId, body.message);

    client.join(conversation.id);
  }

  @SubscribeMessage(ChatMessageTypes.SEND_MESSAGE)
  async sendMessage(
    @MessageBody() body: ChatMessageBody[ChatMessageTypes.SEND_MESSAGE],
    @ConnectedSocket() client: Socket
  ) {
    const conversation = await this.chatService.getConversationByUser(body.conversationId, body.userId);
    if (conversation) {
      const message = await this.chatService.newMessage(conversation.id, body.userId, body.message);

      client.to(conversation.id).emit(ChatMessageTypes.SEND_MESSAGE, {
        conversationId: conversation.id,
        text: message.text,
        timestamp: new Date(),
        status: MessageStatus.SENT,
        me: false,
      });
    }
  }
}
