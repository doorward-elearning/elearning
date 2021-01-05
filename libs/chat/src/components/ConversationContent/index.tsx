import React, { useContext, useEffect } from 'react';
import './ConversationContent.scss';
import ConversationInputForm from '@doorward/chat/components/ConversationInputForm';
import { ChatContext } from '@doorward/chat/Chat';
import ConversationMessageBlock from '@doorward/chat/components/ConversationMessageBlock';
import Empty from '@doorward/ui/components/Empty';
import translate from '@doorward/common/lang/translate';
import { getMessagesByStatus, readMessages } from '@doorward/chat/Chat/functions';
import { WebSocketContext } from '@doorward/ui/components/WebSocketComponent';
import { MessageStatus } from '@doorward/chat/types';

const ConversationContent: React.FunctionComponent<ConversationContentProps> = (props): JSX.Element => {
  const { currentConversation, startNewChat, conversations, sendMessage, currentUser, updateMessage } = useContext(
    ChatContext
  );
  const { socket } = useContext(WebSocketContext);

  useEffect(() => {
    if (currentConversation) {
      const unReadMessages = getMessagesByStatus(currentConversation, MessageStatus.DELIVERED).filter(
        (message) => !message.me
      );
      if (unReadMessages.length) {
        readMessages(currentUser.id, [currentConversation], socket);
        updateMessage(
          unReadMessages.map((message) => message.id),
          {
            status: MessageStatus.READ,
          }
        );
      }
    }
  }, [currentConversation, conversations]);

  return currentConversation ? (
    <div className="ed-conversation-content">
      <div className="ed-conversation-content--messages">
        <div className="ed-conversation-content--messages-list">
          {currentConversation.blocks.map((block) => (
            <ConversationMessageBlock block={block} key={block.day + ''} />
          ))}
        </div>
      </div>
      <div className="ed-conversation-content--input">
        <ConversationInputForm onSendMessage={sendMessage} />
      </div>
    </div>
  ) : (
    <div className="ed-conversation-content__noConversation">
      <Empty
        fullHeight
        icon="chat"
        message={translate('startConversation')}
        onAction={() => startNewChat(true)}
        noBorder
        actionMessage={translate('newChat')}
        actionIcon="add"
      />
    </div>
  );
};

export interface ConversationContentProps {}

export default ConversationContent;
