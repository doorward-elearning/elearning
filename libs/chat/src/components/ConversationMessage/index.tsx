import React from 'react';
import './ConversationMessage.scss';
import classNames from 'classnames';
import { ChatMessage, MessageStatus } from '@doorward/chat/types';
import Icon from '@doorward/ui/components/Icon';
import Spinner from '@doorward/ui/components/Spinner';
import RealTimeMoment from '@doorward/ui/components/RealTimeMoment';

const ConversationMessage: React.FunctionComponent<ConversationMessageProps> = ({ message }): JSX.Element => {
  return (
    <div
      className={classNames({
        'ed-conversation-message': true,
        me: message.me,
      })}
    >
      <div className="ed-conversation-message--text">{message.text}</div>
      <div className="ed-conversation-message--tools">
        <div className="ed-conversation-message--date">
          {message.status !== MessageStatus.SENDING && <RealTimeMoment time={message.timestamp} />}
        </div>
        <div
          className={classNames({
            'message-read-status': true,
            read: message.status === MessageStatus.READ,
          })}
        >
          {message.status >= MessageStatus.SENT && <Icon icon="check" />}
          {message.status >= MessageStatus.DELIVERED && <Icon icon="check" />}
          {message.status <= MessageStatus.SENDING && (
            <span className="sending-indicator">
              <Spinner width={15} height={15} />
            </span>
          )}
        </div>
      </div>
      <span className="chat-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13">
          <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
          <path
            fill={message.me ? 'var(--bg-secondary)' : 'var(--bg-primary)'}
            d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
          />
        </svg>
      </span>
    </div>
  );
};

export interface ConversationMessageProps {
  message: ChatMessage;
}

export default ConversationMessage;