import React, { MouseEventHandler, useEffect, useState } from 'react';
import './ConversationListItem.scss';
import EImage from '@doorward/ui/components/Image';
import Header from '@doorward/ui/components/Header';
import { ChatMessage, Conversation, MessageStatus } from '@doorward/chat/types';
import RealTimeMoment from '@doorward/ui/components/RealTimeMoment';
import classNames from 'classnames';
import Icon from '@doorward/ui/components/Icon';
import Spinner from '@doorward/ui/components/Spinner';
import { getMessagesByStatus } from '@doorward/chat/Chat/functions';
import Badge from '@doorward/ui/components/Badge';

const ConversationListItem: React.FunctionComponent<ConversationListItemProps> = ({
  conversation,
  onClick,
  selected,
}): JSX.Element => {
  const [message, setMessage] = useState<ChatMessage>();
  const [numUnread, setNumUnread] = useState(0);

  useEffect(() => {
    if (conversation.blocks.length) {
      const lastDay = conversation.blocks[conversation.blocks.length - 1];
      if (lastDay?.messages?.length) {
        setMessage(lastDay.messages[lastDay.messages.length - 1]);
      }
      setNumUnread(getMessagesByStatus(conversation, MessageStatus.DELIVERED).filter((message) => !message.me).length);
    }
  }, [conversation]);

  return (
    <div
      className={classNames({
        'ed-conversation-list__item': true,
        selected,
        hasUnread: numUnread > 0,
      })}
      onClick={onClick}
    >
      <div>
        <EImage size="small" circle alt="" src={conversation.avatar} />
      </div>
      <div className="content">
        <div className="content__header">
          <Header size={4} className="content__header-name">
            {conversation.title}
          </Header>
          {message && (
            <span className="content__header-time">
              <RealTimeMoment time={message.timestamp} />
            </span>
          )}
        </div>
        <div className="content__body">
          {message && (
            <span className="last-message">
              <div
                className={classNames({
                  'message-read-status': true,
                  read: message.status === MessageStatus.READ,
                  me: message.me,
                })}
              >
                {message.me && (
                  <React.Fragment>
                    {message.status >= MessageStatus.SENT && <Icon icon="check" />}
                    {message.status >= MessageStatus.DELIVERED && <Icon icon="check" />}
                    {message.status <= MessageStatus.SENDING && (
                      <span className="sending-indicator">
                        <Spinner width={15} height={15} />
                      </span>
                    )}
                  </React.Fragment>
                )}
              </div>
              <div title={message.text} className="last-message__text">
                {message.text}
              </div>
              {numUnread > 0 && <Badge className="unread-counter">{numUnread}</Badge>}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export interface ConversationListItemProps {
  conversation: Conversation;
  onClick: MouseEventHandler;
  selected?: boolean;
}

export default ConversationListItem;
