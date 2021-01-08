import React, { useContext } from 'react';
import { ChatContext } from '@doorward/chat/Chat';
import useSearch from '@doorward/ui/hooks/useSearch';
import './NewGroup.scss';
import classNames from 'classnames';
import Icon from '@doorward/ui/components/Icon';
import Header from '@doorward/ui/components/Header';
import translate from '@doorward/common/lang/translate';
import Search from '@doorward/ui/components/Search';
import Tools from '@doorward/common/utils/Tools';

const NewGroup: React.FunctionComponent<NewGroupProps> = (props): JSX.Element => {
  const {
    startNewGroupChat,
    groups,
    setConversations,
    conversations,
    startNewChat,
    setCurrentConversationId,
  } = useContext(ChatContext);

  const { filtered: filteredGroups, search, setSearch } = useSearch(groups, (search, item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={classNames({
        'ed-new-group-chat': true,
        open: props.open,
      })}
    >
      <div className="ed-new-group-chat--header">
        <Icon icon="arrow_back" onClick={() => startNewGroupChat(false)} />
        <Header size={2}>{translate('newGroupChat')}</Header>
      </div>
      <div className="ed-new-group-chat__search">
        <Search onChange={setSearch} search={search} placeholder={translate('searchGroups')} />
      </div>
      <div className="ed-new-group-chat__contacts">
        {filteredGroups.map((contact) => (
          <div
            className="ed-new-group-chat__contact"
            onClick={() => {
              const createConversation = {
                recipient: contact,
                title: contact.name,
                avatar: '',
                id: Tools.generateId(),
                blocks: [],
                lastMessageTimestamp: new Date(),
                directMessage: false,
              };
              const newConversation =
                conversations.find((conversation) => contact.id === conversation.recipient.id) || createConversation;

              if (newConversation.id === createConversation.id) {
                setConversations([newConversation, ...conversations]);
              }

              setCurrentConversationId(newConversation.id);

              startNewGroupChat(false);
              startNewChat(false);
            }}
          >
            <Icon icon="group" />
            <div className="ed-new-group-chat__contact__content">
              <Header size={3}>{contact.name}</Header>
              <span>{translate('memberCount', { count: contact.members.length })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface NewGroupProps {
  open?: boolean;
}

export default NewGroup;
