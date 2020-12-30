import React, { useContext } from 'react';
import './ConversationContent.scss';
import ConversationInputForm from '@doorward/chat/components/ConversationInputForm';
import { ChatContext } from '@doorward/chat/Chat';
import ConversationMessageBlock from '@doorward/chat/components/ConversationMessageBlock';

const ConversationContent: React.FunctionComponent<ConversationContentProps> = (props): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);
  return currentConversation ? (
    <div className="ed-conversation-content">
      <div className="ed-conversation-content--messages">
        <div className="ed-conversation-content--messages-list">
          {currentConversation.blocks.map((block) => (
            <ConversationMessageBlock block={block} />
          ))}
        </div>
      </div>
      <div className="ed-conversation-content--input">
        <ConversationInputForm />
      </div>
    </div>
  ) : null;
};

export interface ConversationContentProps {}

export default ConversationContent;
