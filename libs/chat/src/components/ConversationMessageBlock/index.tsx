import React from 'react';
import './ConversationMessageBlock.scss';
import { MessageBlock } from '@doorward/chat/types';
import ConversationMessage from '@doorward/chat/components/ConversationMessage';
import Pill from '@doorward/ui/components/Pill';
import TimeDisplay from '@doorward/ui/components/TimeDisplay';

const ConversationMessageBlock: React.FunctionComponent<ConversationMessageBlockProps> = ({ block }): JSX.Element => {
  return (
    <div className="ed-conversation-message-block">
      <div className="ed-conversation-message-block--title">
        <Pill>
          <TimeDisplay time={block.day} max="day" />
        </Pill>
      </div>
      <div className="ed-conversation-message-block--messages">
        {block.messages.map((message) => (
          <ConversationMessage message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
};

export interface ConversationMessageBlockProps {
  block: MessageBlock;
}

export default ConversationMessageBlock;
