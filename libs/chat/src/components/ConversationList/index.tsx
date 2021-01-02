import React, { useContext, useEffect } from 'react';
import './ConversationList.scss';
import ConversationListItem from '@doorward/chat/components/ConversationListItem';
import Search from '@doorward/ui/components/Search';
import translate from '@doorward/common/lang/translate';
import { ChatContext } from '@doorward/chat/Chat';
import Button from '@doorward/ui/components/Buttons/Button';
import WebComponent from '@doorward/ui/components/WebComponent';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardChatApi from '../../../../../apps/doorward-frontend/src/services/apis/doorward.chat.api';

const ConversationList: React.FunctionComponent<ConversationListProps> = (props): JSX.Element => {
  const { conversations, setConversations, setCurrentConversation, currentConversation, startNewChat } = useContext(
    ChatContext
  );

  const fetchConversations = useAction(DoorwardChatApi.chat.getConversations, {
    onSuccess: (response) => {
      setConversations(response.conversations);
    },
  });

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="ed-conversation-list">
      <div className="ed-conversation-list__search">
        <Search onChange={() => {}} placeholder={translate('searchConversations')} />
      </div>
      <div className="ed-conversation-list__items">
        <WebComponent
          data={conversations}
          noBorder
          loading={false}
          size="small"
          icon="chat"
          fullHeight
          message={translate('thereAreNoConversations')}
        >
          {(conversations) => (
            <React.Fragment>
              {conversations.map((conversation) => (
                <ConversationListItem
                  selected={currentConversation?.id === conversation.id}
                  conversation={conversation}
                  onClick={() => setCurrentConversation(conversation)}
                />
              ))}
            </React.Fragment>
          )}
        </WebComponent>
      </div>
      <div className="ed-conversation-list--newChat">
        <Button mini fab icon="add" onClick={() => startNewChat(true)} />
      </div>
    </div>
  );
};

export interface ConversationListProps {}

export default ConversationList;
