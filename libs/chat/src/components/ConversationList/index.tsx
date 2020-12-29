import React, { useContext } from 'react';
import './ConversationList.scss';
import ConversationListItem from '@doorward/chat/components/ConversationListItem';
import Search from '@doorward/ui/components/Search';
import translate from '@doorward/common/lang/translate';
import { ChatContext } from '@doorward/chat/Chat';

const ConversationList: React.FunctionComponent<ConversationListProps> = (props): JSX.Element => {
  const { conversations, setCurrentConversation, currentConversation } = useContext(ChatContext);
  return (
    <div className="ed-conversation-list">
      <div className="ed-conversation-list__search">
        <Search onChange={() => {}} placeholder={translate('searchConversations')} />
      </div>
      <div>
        {conversations.map((conversation) => (
          <ConversationListItem
            selected={currentConversation?.id === conversation.id}
            conversation={conversation}
            onClick={() => setCurrentConversation(conversation)}
          />
        ))}
      </div>
    </div>
  );
};

export interface ConversationListProps {}

export default ConversationList;
