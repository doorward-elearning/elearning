import React from 'react';
import './ConversationListItem.scss';
import EImage from '@edudoor/ui/components/Image';
import Header from '@edudoor/ui/components/Header';

const ConversationListItem: React.FunctionComponent<ConversationListItemProps> = (props): JSX.Element => {
  return (
    <div className="ed-conversation-list__item">
      <div>
        <EImage size="medium" circle alt="" />
      </div>
      <div className="content">
        <Header size={4} className="name">
          Moses Gitau
        </Header>
        <span className="last-message">How are you doing today? Because this is a very long text.</span>
      </div>
    </div>
  );
};

export interface ConversationListItemProps {
  recipient: Recipient;
}

export default ConversationListItem;