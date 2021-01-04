import React, { useContext } from 'react';
import './ConversationFrame.scss';
import ConversationHeader from '@doorward/chat/components/ConversationHeader';
import ConversationContent from '@doorward/chat/components/ConversationContent';
import { ChatContext } from '@doorward/chat/Chat';
import { ChatMessageBody, ChatMessageTypes } from '@doorward/chat/chat.message.types';
import useWebsocketEvent from '@doorward/ui/hooks/useWebsocketEvent';
import { MessageStatus } from '@doorward/chat/types';

const ConversationFrame: React.FunctionComponent<ConversationFrameProps> = (props): JSX.Element => {
  const { updateMessage, conversations, newMessage } = useContext(ChatContext);

  useWebsocketEvent(
    ChatMessageTypes.NEW_MESSAGE,
    (message) => {
      newMessage(message.conversationId, {
        ...message,
      });

      return {
        event: ChatMessageTypes.DELIVERY_REPORT,
        data: {
          conversationId: message.conversationId,
          messageId: message.id,
          timestamp: new Date(),
        },
      };
    },
    [newMessage]
  );

  useWebsocketEvent<ChatMessageBody[ChatMessageTypes.SENT_REPORT]>(
    ChatMessageTypes.SENT_REPORT,
    (data) => {
      updateMessage(data.messageId, {
        status: MessageStatus.SENT,
      });
    },
    [updateMessage]
  );

  useWebsocketEvent<ChatMessageBody[ChatMessageTypes.DELIVERY_REPORT]>(
    ChatMessageTypes.DELIVERY_REPORT,
    (data) => {
      updateMessage(data.messageId, {
        status: MessageStatus.DELIVERED,
      });
    },
    [updateMessage]
  );

  useWebsocketEvent<ChatMessageBody[ChatMessageTypes.READ_REPORT]>(
    ChatMessageTypes.READ_REPORT,
    (data) => {
      updateMessage(data.messageId, {
        status: MessageStatus.READ,
      });
    },
    [updateMessage]
  );
  return (
    <div className="ed-conversation-frame">
      <ConversationHeader />
      <ConversationContent />
    </div>
  );
};

export interface ConversationFrameProps {}

export default ConversationFrame;
