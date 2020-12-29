import React from 'react';
import './ConversationFrame.scss';
import ConversationHeader from '@doorward/chat/components/ConversationHeader';
import ConversationContent from '@doorward/chat/components/ConversationContent';

const ConversationFrame: React.FunctionComponent<ConversationFrameProps> = (props): JSX.Element => {
  return (
    <div className="ed-conversation-frame">
      <ConversationHeader />
      <ConversationContent />
    </div>
  );
};

export interface ConversationFrameProps {}

export default ConversationFrame;
