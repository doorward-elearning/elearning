import { ChatMessage, Conversation, MessageStatus } from '@doorward/chat/types';

export enum ChatMessageTypes {
  INITIALIZE = 'INITIALIZE',
  SEND_MESSAGE = 'SEND_MESSAGE',
  NEW_MESSAGE = 'NEW_MESSAGE',
  DELIVERY_REPORT = 'DELIVERY_REPORT',
  READ_REPORT = 'READ_REPORT',
  MESSAGE_CHANGED = 'MESSAGE_CHANGED',
  NEW_CONVERSATION = 'NEW_CONVERSATION',
  REGISTER_CONVERSATION = 'REGISTER_CONVERSATION',
}

export interface ChatMessageBody extends Record<ChatMessageTypes, any> {
  INITIALIZE: {
    userId: string;
  };
  SEND_MESSAGE: {
    userId: string;
    message: string;
    conversationId: string;
    recipientId: string;
    messageId: string;
    directMessage: boolean;
  };
  NEW_MESSAGE: {
    conversationId: string;
    text: string;
    timestamp: string | Date;
    status: MessageStatus;
    me: boolean;
    id: string;
  };
  SENT_REPORT: {
    conversationId: string;
    messageId: string;
    timestamp: string | Date;
  };
  DELIVERY_REPORT: {
    conversationId: string;
    messageId: string;
    timestamp: string | Date;
    userId: string;
    messageRead?: boolean;
  };
  READ_REPORT: {
    conversationId: string;
    messageId: string;
    timestamp: string | Date;
    userId: string;
  };
  MESSAGE_CHANGED: { id: string } & Partial<ChatMessage>;
  NEW_CONVERSATION: Conversation;
  REGISTER_CONVERSATION: { conversationId: string; userId: string };
}
