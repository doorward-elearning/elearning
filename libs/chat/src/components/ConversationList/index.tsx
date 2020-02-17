import React from 'react';
import './ConversationList.scss';
import ItemArray from '@edudoor/ui/components/ItemArray';
import ConversationListItem from '@edudoor/chat/components/ConversationListItem';

const ConversationList: React.FunctionComponent<ConversationListProps> = (props): JSX.Element => {
  return (
    <div className="ed-conversation-list">
      <ItemArray data={props.conversations}>
        {item => {
          return <ConversationListItem recipient={item.recipient} />;
        }}
      </ItemArray>
    </div>
  );
};

export interface ConversationListProps {
  conversations: Array<Conversation>;
}

export default ConversationList;
