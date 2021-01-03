export enum ChatMessageTypes {
  INITIALIZE = 'INITIALIZE',
  SEND_MESSAGE = 'SEND_MESSAGE',
  SEND_MESSAGE_TO_NEW_CONVERSATION = 'SEND_MESSAGE_TO_NEW_CONVERSATION',
}

export interface ChatMessageBody extends Record<ChatMessageTypes, any> {
  INITIALIZE: {
    userId: string;
  };
  SEND_MESSAGE: {
    userId: string;
    message: string;
    conversationId: string;
  };
  SEND_MESSAGE_TO_NEW_CONVERSATION: {
    userId: string;
    message: string;
    recipientId: string;
  };
}
