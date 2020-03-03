import React from 'react';
import './ConversationFrame.scss';
import ConversationHeader from '@edudoor/chat/components/ConversationHeader';

const ConversationFrame: React.FunctionComponent<ConversationFrameProps> = (props): JSX.Element => {
  return (
    <div className="ed-conversation-frame">
      <ConversationHeader />
    </div>
  );
};

export interface ConversationFrameProps {}

export default ConversationFrame;
