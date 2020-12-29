import React, { useState } from 'react';
import './Chat.scss';
import classNames from 'classnames';
import ConversationList from '../components/ConversationList';
import ConversationFrame from '../components/ConversationFrame';
import { Conversation } from '@doorward/chat/types';

export interface ChatContextType {
  conversations: Array<Conversation>;
  currentConversation: Conversation;
  setCurrentConversation: (conversation: Conversation) => void;
}

export const ChatContext = React.createContext<ChatContextType>({
  conversations: [],
  currentConversation: null,
  setCurrentConversation: () => {},
});

const Chat: React.FunctionComponent<ChatProps> = (props): JSX.Element => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>(
    props.currentConversation || props.conversations[0]
  );

  return (
    <ChatContext.Provider value={{ conversations: props.conversations, currentConversation, setCurrentConversation }}>
      <div
        className={classNames({
          'ed-chat': true,
          single: props.conversations.length === 1,
          [props.size || 'large']: true,
        })}
      >
        <ConversationList />
        <ConversationFrame />
      </div>
    </ChatContext.Provider>
  );
};

export interface ChatProps {
  conversations: Array<Conversation>;
  currentConversation?: Conversation;
  size?: 'small' | 'medium' | 'large';
}

export default Chat;
