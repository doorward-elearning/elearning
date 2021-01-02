import React, { useContext, useEffect } from 'react';
import './ConversationList.scss';
import ConversationListItem from '@doorward/chat/components/ConversationListItem';
import Search from '@doorward/ui/components/Search';
import translate from '@doorward/common/lang/translate';
import { ChatContext } from '@doorward/chat/Chat';
import Button from '@doorward/ui/components/Buttons/Button';
import WebComponent from '@doorward/ui/components/WebComponent';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const ConversationList: React.FunctionComponent<ConversationListProps> = (props): JSX.Element => {
  const { conversations, setConversations, setCurrentConversation, currentConversation, startNewChat } = useContext(
    ChatContext
  );

  const fetchConversations = useApiAction(DoorwardChatApi, 'chat', 'getConversations', {
    onSuccess: (response) => {
      if (response.conversations.length) {
        setConversations(response.conversations);
        setCurrentConversation(response.conversations[0]);
      }
    },
  });

  useEffect(() => {
    fetchConversations.action();
  }, []);

  return (
    <div className="ed-conversation-list">
      <div className="ed-conversation-list__search">
        <Search onChange={() => {}} placeholder={translate('searchConversations')} />
      </div>
      <WebComponent
        data={conversations}
        noBorder
        loading={fetchConversations.state.fetching}
        size="small"
        icon="chat"
        fullHeight
        message={translate('thereAreNoConversations')}
      >
        {(conversations) => (
          <div className="ed-conversation-list__items">
            {conversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                selected={currentConversation?.id === conversation.id}
                conversation={conversation}
                onClick={() => setCurrentConversation(conversation)}
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
