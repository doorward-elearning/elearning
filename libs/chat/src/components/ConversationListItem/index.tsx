import React, { MouseEventHandler, useEffect, useState } from 'react';
import './ConversationListItem.scss';
import EImage from '@doorward/ui/components/Image';
import Header from '@doorward/ui/components/Header';
import { ChatMessage, Conversation } from '@doorward/chat/types';
import RealTimeMoment from '@doorward/ui/components/RealTimeMoment';
import classNames from 'classnames';

const ConversationListItem: React.FunctionComponent<ConversationListItemProps> = ({
  conversation,
  onClick,
  selected,
}): JSX.Element => {
  const [message, setMessage] = useState<ChatMessage>();

  useEffect(() => {
    if (conversation.blocks.length) {
      const lastDay = conversation.blocks[conversation.blocks.length - 1];
      if (lastDay?.messages?.length) {
        setMessage(lastDay.messages[lastDay.messages.length - 1]);
      }
    }
  }, [conversation]);

  return (
    <div
      className={classNames({
        'ed-conversation-list__item': true,
        selected,
      })}
      onClick={onClick}
    >
      <div>
        <EImage size="small" circle alt="" src={conversation.recipient.picture} />
      </div>
      <div className="content">
        <div className="content__header">
          <Header size={4} className="content__header-name">
            {conversation.recipient.name}
          </Header>
          {message && (
            <span className="content__header-time">
              <RealTimeMoment time={message.timestamp} />
            </span>
          )}
        </div>
        {message && <span className="last-message">{message.text}</span>}
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
