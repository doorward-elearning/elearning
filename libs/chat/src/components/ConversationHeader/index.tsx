import React, { useContext } from 'react';
import './ConversationHeader.scss';
import EImage from '@doorward/ui/components/Image';
import Header from '@doorward/ui/components/Header';
import { ChatContext } from '@doorward/chat/Chat';

const ConversationHeader: React.FunctionComponent<ConversationHeaderProps> = (props): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);

  return currentConversation ? (
    <div className="ed-conversation-header">
      <EImage size="small" circle src={currentConversation.avatar} />
      <div className="ed-conversation-header__content">
        <Header size={4}> {currentConversation.title}</Header>
        {!currentConversation.directMessage && (
          <div className="ed-conversation-header__content--recipients">{currentConversation.recipientsList}</div>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
};

export interface ConversationHeaderProps {}

export default ConversationHeader;
