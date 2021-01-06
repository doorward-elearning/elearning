import React, { useContext, useEffect, useState } from 'react';
import './ConversationList.scss';
import ConversationListItem from '@doorward/chat/components/ConversationListItem';
import Search from '@doorward/ui/components/Search';
import translate from '@doorward/common/lang/translate';
import { ChatContext } from '@doorward/chat/Chat';
import Button from '@doorward/ui/components/Buttons/Button';
import WebComponent from '@doorward/ui/components/WebComponent';
import moment from 'moment';

const ConversationList: React.FunctionComponent<ConversationListProps> = (props): JSX.Element => {
  const { conversations, setCurrentConversationId, currentConversation, startNewChat } = useContext(ChatContext);
  const [sortedConversations, setSortedConversations] = useState([]);

  useEffect(() => {
    setSortedConversations(
      conversations.sort((a, b) => moment(b.lastMessageTimestamp).diff(moment(a.lastMessageTimestamp)))
    );
  }, [conversations, currentConversation]);

  return (
    <div className="ed-conversation-list">
      <div className="ed-conversation-list__search">
        <Search onChange={() => {}} placeholder={translate('searchConversations')} />
      </div>
      <WebComponent
        data={conversations}
        noBorder
        loading={false}
        size="small"
        icon="chat"
        fullHeight
        message={translate('thereAreNoConversations')}
      >
        {() => (
          <div className="ed-conversation-list__items">
            {sortedConversations.map((conversation, index) => (
              <ConversationListItem
                key={conversation.id}
                selected={currentConversation?.id === conversation.id}
                conversation={conversation}
                onClick={() => {
                  setCurrentConversationId(conversation.id);
                }}
              />
            ))}
          </div>
        )}
      </WebComponent>
      <div className="ed-conversation-list--newChat">
        <Button mini fab icon="add" onClick={() => startNewChat(true)} />
      </div>
    </div>
  );
};

export interface ConversationListProps {}

export default ConversationList;
