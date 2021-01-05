import React, { useCallback, useEffect, useState } from 'react';
import './Chat.scss';
import classNames from 'classnames';
import ConversationList from '../components/ConversationList';
import ConversationFrame from '../components/ConversationFrame';
import { ChatMessage, Conversation, Recipient } from '@doorward/chat/types';
import NewChat from '@doorward/chat/components/NewChat';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';
import WebSocketComponent from '@doorward/ui/components/WebSocketComponent';
import { ChatMessageTypes } from '@doorward/chat/chat.message.types';
import { UseAuth } from '@doorward/ui/hooks/useAuth';
import UserEntity from '@doorward/common/entities/user.entity';
import NewGroup from '../components/NewGroup';
import GroupEntity from '@doorward/common/entities/group.entity';
import useApiAction from '@doorward/ui/hooks/useApiAction';
import { addNewMessage, sendNewMessage, updateExistingMessage } from '@doorward/chat/Chat/functions';

export interface ChatContextType {
  currentUser: UserEntity;
  conversations: Array<Conversation>;
  currentConversation: Conversation;
  newChat: boolean;
  newGroupChat: boolean;
  setCurrentConversation: (conversationIndex: string) => void;
  startNewChat: (open: boolean) => void;
  startNewGroupChat: (open: boolean) => void;
  contacts: Array<Recipient>;
  groups: Array<GroupEntity>;
  setGroups: (groups: Array<GroupEntity>) => void;
  sendMessage: (message: string) => void;
  newMessage: (conversationId: string, message: ChatMessage) => void;
  setConversations: (conversations: Array<Conversation>) => void;
  updateMessage: (messageIds: Array<string>, data: Partial<ChatMessage>) => ChatMessage;
}

export const ChatContext = React.createContext<ChatContextType>({
  currentUser: null,
  conversations: [],
  currentConversation: null,
  newChat: false,
  setCurrentConversation: () => {},
  startNewChat: () => {},
  contacts: [],
  sendMessage: () => {},
  newMessage: () => {},
  setConversations: () => {},
  updateMessage: () => null,
  newGroupChat: false,
  startNewGroupChat: () => {},
  groups: [],
  setGroups: (groups: Array<GroupEntity>) => {},
});

const Chat: React.FunctionComponent<ChatProps> = (props): JSX.Element => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const [currentConversationId, setCurrentConversationId] = useState();
  const [conversations, setConversations] = useState(props.conversations);
  const [newChat, startNewChat] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newGroupChat, startNewGroupChat] = useState(false);
  const [groups, setGroups] = useState([]);

  const fetchContacts = useAction(DoorwardChatApi.contacts.getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });

  const fetchGroups = useApiAction(DoorwardChatApi, 'contacts', 'getGroupContacts', {
    onSuccess: (data) => {
      setGroups(data.groups);
    },
  });

  useEffect(() => {
    if (currentConversationId) {
      setCurrentConversation(conversations.find((conversation) => conversation.id === currentConversationId));
    }
  }, [currentConversationId, conversations]);

  const newMessage = useCallback(
    (conversationId: string, message: ChatMessage) =>
      addNewMessage(
        conversations,
        setConversations,
        currentConversation,
        setCurrentConversation,
        conversationId,
        message
      ),
    [conversations, currentConversation]
  );

  const sendMessage = useCallback(
    (socket: SocketIOClient.Socket, message: string) =>
      sendNewMessage(props.auth.user.id, currentConversation, newMessage, socket, message),
    [currentConversation, newMessage]
  );

  const updateMessage = useCallback(
    (messageIds: Array<string>, data: Partial<ChatMessage>) =>
      updateExistingMessage(conversations, setConversations, messageIds, data),
    [conversations, setConversations]
  );

  useEffect(() => {
    fetchContacts();
    fetchGroups.action();
  }, []);

  return props.auth.user ? (
    <WebSocketComponent
      endpoint={process.env.REACT_APP_CHAT_WEBSOCKET_URL}
      initialize={(socket) => {
        socket.emit(ChatMessageTypes.INITIALIZE, {
          userId: props.auth.user.id,
        });
      }}
    >
      {(socket) => {
        return (
          <ChatContext.Provider
            value={{
              currentUser: props.auth.user,
              conversations,
              currentConversation,
              setCurrentConversation: setCurrentConversationId,
              newChat,
              startNewChat,
              contacts,
              setConversations,
              sendMessage: (message) => sendMessage(socket, message),
              newMessage,
              updateMessage,
              newGroupChat,
              startNewGroupChat,
              groups,
              setGroups,
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
                <NewGroup open={newGroupChat} />
              </div>
              <ConversationFrame />
            </div>
          </ChatContext.Provider>
        );
      }}
    </WebSocketComponent>
  ) : null;
};

export interface ChatProps {
  conversations: Array<Conversation>;
  contacts?: Array<Recipient>;
  currentConversation?: Conversation;
  size?: 'small' | 'medium' | 'large';
  auth: UseAuth;
}

export default Chat;
