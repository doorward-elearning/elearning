import { ChatMessage, Conversation, MessageStatus } from '@doorward/chat/types';
import { ChatMessageTypes } from '@doorward/chat/chat.message.types';

export const getMessagesByStatus = (conversation: Conversation, status: MessageStatus): Array<ChatMessage> => {
  const messages = [];

  conversation.blocks.forEach((block) => {
    block.messages.forEach((message) => {
      if (message.status === status) {
        messages.push(message);
      }
    });
  });
  return messages;
};

export const deliverMessages = (userId: string, conversations: Array<Conversation>, socket: SocketIOClient.Socket) => {
  conversations.forEach((conversation) => {
    socket.emit(ChatMessageTypes.DELIVERY_REPORT, {
      conversationId: conversation.id,
      userId,
      timestamp: new Date(),
    });
  });
};

export const readMessages = (userId: string, conversations: Array<Conversation>, socket: SocketIOClient.Socket) => {
  conversations.forEach((conversation) => {
    socket.emit(ChatMessageTypes.READ_REPORT, {
      conversationId: conversation.id,
      timestamp: new Date(),
      userId,
    });
  });
};
