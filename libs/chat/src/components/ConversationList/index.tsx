import React from 'react';
import './ConversationList.scss';
import ItemArray from '@edudoor/ui/components/ItemArray';
import ConversationListItem from '@edudoor/chat/components/ConversationListItem';
import Search from '@edudoor/ui/components/Search';
import { Conversation } from '@edudoor/chat/type';

const ConversationList: React.FunctionComponent<ConversationListProps> = (props): JSX.Element => {
  return (
    <div className="ed-conversation-list">
      <Search onChange={() => {}} placeholder="Search conversations..." />
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
