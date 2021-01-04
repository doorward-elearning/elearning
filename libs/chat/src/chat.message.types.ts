import { MessageStatus } from '@doorward/chat/types';

export enum ChatMessageTypes {
  INITIALIZE = 'INITIALIZE',
  SEND_MESSAGE = 'SEND_MESSAGE',
  SENT_REPORT = 'SENT_REPORT',
  NEW_MESSAGE = 'NEW_MESSAGE',
  DELIVERY_REPORT = 'DELIVERY_REPORT',
  READ_REPORT = 'READ_REPORT',
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
  };
  READ_REPORT: {
    conversationId: string;
    messageId: string;
    timestamp: string | Date;
    userId: string;
  };
}
