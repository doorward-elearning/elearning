import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ChatMessageBody, ChatMessageTypes } from '@doorward/chat/chat.message.types';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ transports: ['websocket'] })
export default class ChatGateway {
  constructor(private chatService: ChatService) {}

  @SubscribeMessage(ChatMessageTypes.INITIALIZE)
  onEvent(@MessageBody() body: ChatMessageBody[ChatMessageTypes.INITIALIZE], @ConnectedSocket() client: Socket) {
    console.log(body);
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
}
