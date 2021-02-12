import React, { useContext } from 'react';
import './ConversationHeader.scss';
import Header from '@doorward/ui/components/Header';
import { ChatContext } from '@doorward/chat/Chat';
import ProfilePicture from '@doorward/ui/components/ProfilePicture';

const ConversationHeader: React.FunctionComponent<ConversationHeaderProps> = (props): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);

  return currentConversation ? (
    <div className="ed-conversation-header">
      <ProfilePicture user={{ profilePicture: currentConversation.avatar, fullName: currentConversation.title }} />
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
