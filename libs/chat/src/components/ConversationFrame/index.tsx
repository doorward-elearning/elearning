import React, { useContext } from 'react';
import './ConversationFrame.scss';
import ConversationHeader from '@doorward/chat/components/ConversationHeader';
import ConversationContent from '@doorward/chat/components/ConversationContent';
import { ChatContext } from '@doorward/chat/Chat';
import { ChatMessageBody, ChatMessageTypes } from '@doorward/chat/chat.message.types';
import useWebsocketEvent from '@doorward/ui/hooks/useWebsocketEvent';
import { Conversation, MessageStatus } from '@doorward/chat/types';

const ConversationFrame: React.FunctionComponent<ConversationFrameProps> = (props): JSX.Element => {
  const { updateMessage, currentConversation, conversations, currentUser, newMessage, setConversations } = useContext(
    ChatContext
  );

  useWebsocketEvent(
    ChatMessageTypes.NEW_CONVERSATION,
    (conversation: Conversation) => {
      setConversations([conversation, ...conversations]);

      return {
        event: ChatMessageTypes.REGISTER_CONVERSATION,
        data: {
          conversationId: conversation.id,
          userId: currentUser.id,
        },
      };
    },
    [setConversations, conversations]
  );

  useWebsocketEvent(
    ChatMessageTypes.NEW_MESSAGE,
    (message) => {
      newMessage(message.conversationId, {
        ...message,
        status: MessageStatus.DELIVERED,
      });

      const data = {
        conversationId: message.conversationId,
        messageId: message.id,
        timestamp: new Date(),
        userId: currentUser.id,
        messageRead: message.conversationId === currentConversation.id,
      };

      return {
        event: ChatMessageTypes.DELIVERY_REPORT,
        data,
      };
    },
    [newMessage, currentConversation]
  );

  useWebsocketEvent<ChatMessageBody[ChatMessageTypes.MESSAGE_CHANGED]>(
    ChatMessageTypes.MESSAGE_CHANGED,
    (data) => {
      updateMessage([data.id], {
        ...data,
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
