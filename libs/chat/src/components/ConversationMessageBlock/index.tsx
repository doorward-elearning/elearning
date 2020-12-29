import React from 'react';
import './ConversationMessageBlock.scss';
import { MessageBlock } from '@doorward/chat/types';
import ConversationMessage from '@doorward/chat/components/ConversationMessage';
import Pill from '@doorward/ui/components/Pill';

const ConversationMessageBlock: React.FunctionComponent<ConversationMessageBlockProps> = ({ block }): JSX.Element => {
  return (
    <div className="ed-conversation-message-block">
      <div className="ed-conversation-message-block--title">
        <Pill>{block.day}</Pill>
      </div>
      <div className="ed-conversation-message-block--messages">
        {block.messages.map((message) => (
          <ConversationMessage message={message} />
        ))}
      </div>
    </div>
  );
};

export interface ConversationMessageBlockProps {
  block: MessageBlock;
}

export default ConversationMessageBlock;
