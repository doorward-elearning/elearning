import React from 'react';
import './Chat.scss';
import classNames from 'classnames';
import ConversationList from '@edudoor/chat/components/ConversationList';
import ConversationFrame from '@edudoor/chat/components/ConversationFrame';

const Chat: React.FunctionComponent<ChatProps> = (props): JSX.Element => {
  return (
    <div
      className={classNames({
        'ed-chat': true,
        single: props.conversations.length === 1,
        [props.size || 'large']: true,
      })}
    >
      <ConversationList conversations={props.conversations} />
      <ConversationFrame />
    </div>
  );
};

export interface ChatProps {
  conversations: Array<Conversation>;
  size?: 'small' | 'medium' | 'large';
}

export default Chat;
