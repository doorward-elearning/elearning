import React from 'react';
import './ConversationHeader.scss';
import EImage from '@doorward/ui/components/Image';
import Header from '@doorward/ui/components/Header';

const ConversationHeader: React.FunctionComponent<ConversationHeaderProps> = (props): JSX.Element => {
  return (
    <div className="ed-conversation-header">
      <EImage size="small" circle />
      <div className="ed-conversation-header__content">
        <Header size={4}>Moses Gitau</Header>
      </div>
    </div>
  );
};

export interface ConversationHeaderProps {}

export default ConversationHeader;
