import React, { useEffect, useState } from 'react';
import './Chat.scss';
import classNames from 'classnames';
import ConversationList from '../components/ConversationList';
import ConversationFrame from '../components/ConversationFrame';
import { Conversation, Recipient } from '@doorward/chat/types';
import NewChat from '@doorward/chat/components/NewChat';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardChatApi from '../../../../apps/doorward-frontend/src/services/apis/doorward.chat.api';
import WebSocketComponent from '@doorward/ui/components/WebSocketComponent';

export interface ChatContextType {
  conversations: Array<Conversation>;
  currentConversation: Conversation;
  newChat: boolean;
  setCurrentConversation: (conversation: Conversation) => void;
  startNewChat: (open: boolean) => void;
  contacts: Array<Recipient>;
}

export const ChatContext = React.createContext<ChatContextType>({
  conversations: [],
  currentConversation: null,
  newChat: false,
  setCurrentConversation: () => {},
  startNewChat: () => {},
  contacts: [],
});

const Chat: React.FunctionComponent<ChatProps> = (props): JSX.Element => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>(
    props.currentConversation || props.conversations[0]
  );
  const [newChat, startNewChat] = useState(false);

  const [contacts, setContacts] = useState([]);

  const fetchContacts = useAction(DoorwardChatApi.contacts.getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <WebSocketComponent endpoint={process.env.REACT_APP_CHAT_WEBSOCKET_URL}>
      <ChatContext.Provider
        value={{
          conversations: props.conversations,
          currentConversation,
          setCurrentConversation,
          newChat,
          startNewChat,
          contacts: contacts,
        }}
      >
        <div
          className={classNames({
            'ed-chat': true,
            single: props.conversations.length === 1,
            [props.size || 'large']: true,
          })}
        >
          <div className="ed-chat-sidebar">
            <ConversationList />
            <NewChat open={newChat} />
          </div>
          <ConversationFrame />
        </div>
      </ChatContext.Provider>
    </WebSocketComponent>
  );
};

export interface ChatProps {
  conversations: Array<Conversation>;
  contacts?: Array<Recipient>;
  currentConversation?: Conversation;
  size?: 'small' | 'medium' | 'large';
}

export default Chat;
