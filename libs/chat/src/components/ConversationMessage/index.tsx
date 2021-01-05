import React, { useContext } from 'react';
import './ConversationMessage.scss';
import classNames from 'classnames';
import { ChatMessage, MessageStatus } from '@doorward/chat/types';
import Icon from '@doorward/ui/components/Icon';
import Spinner from '@doorward/ui/components/Spinner';
import RealTimeMoment from '@doorward/ui/components/RealTimeMoment';
import EImage from '@doorward/ui/components/Image';
import { ChatContext } from '@doorward/chat/Chat';

const ConversationMessage: React.FunctionComponent<ConversationMessageProps> = ({ message }): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);
  return (
    <div
      className={classNames({
        'ed-conversation-message': true,
        me: message.me,
      })}
    >
      <div className="ed-conversation-message__profile">
        <EImage size="small" circle alt="" src={message.sender?.profilePicture} />
      </div>
      <div className="ed-conversation-message__content">
        {!message.me && !currentConversation.directMessage && (
          <div className="ed-conversation-message__content--senderName">{message.sender?.fullName}</div>
        )}
        <div className="ed-conversation-message__content--text">{message.text}</div>
        <div className="ed-conversation-message__content--tools">
          <div className="ed-conversation-message__content--date">
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
      </div>
    </div>
  );
};

export interface ConversationMessageProps {
  message: ChatMessage;
}

export default ConversationMessage;
