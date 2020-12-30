import React, { useContext } from 'react';
import './NewChat.scss';
import Header from '@doorward/ui/components/Header';
import translate from '@doorward/common/lang/translate';
import classNames from 'classnames';
import Icon from '@doorward/ui/components/Icon';
import { ChatContext } from '@doorward/chat/Chat';
import Search from '@doorward/ui/components/Search';
import EImage from '@doorward/ui/components/Image';
import Tools from '@doorward/common/utils/Tools';

const NewChat: React.FunctionComponent<NewChatProps> = (props): JSX.Element => {
  const { startNewChat, contacts, currentConversation, conversations, setCurrentConversation } = useContext(
    ChatContext
  );
  return (
    <div
      className={classNames({
        'ed-new-chat': true,
        open: props.open,
      })}
    >
      <div className="ed-new-chat--header">
        <Icon icon="arrow_back" onClick={() => startNewChat(false)} />
        <Header size={2}>{translate('newChat')}</Header>
      </div>
      <div className="ed-new-chat__search">
        <Search onChange={() => {}} placeholder={translate('searchConversations')} />
      </div>
      <div className="ed-new-chat__contacts">
        {contacts.map((contact) => (
          <div
            className="ed-new-chat__contact"
            onClick={() => {
              const newConversation = conversations.find((conversation) => contact.id === conversation.recipient.id);

              setCurrentConversation(
                newConversation || {
                  recipient: contact,
                  title: contact.fullName,
                  avatar: contact.profilePicture,
                  id: Tools.randomString(),
                  blocks: [],
                }
              );
              startNewChat(false);
            }}
          >
            <EImage size="small" circle src={contact.profilePicture} />
            <div className="ed-new-chat__contact__content">
              <Header size={3}>{contact.fullName}</Header>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface NewChatProps {
  open: boolean;
}

export default NewChat;
