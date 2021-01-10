import React, { useContext, useEffect } from 'react';
import './Chat.scss';
import classNames from 'classnames';
import ConversationList from '../components/ConversationList';
import ConversationFrame from '../components/ConversationFrame';
import { ChatMessage, Conversation, Recipient } from '@doorward/chat/types';
import NewChat from '@doorward/chat/components/NewChat';
import { UseAuth } from '@doorward/ui/hooks/useAuth';
import UserEntity from '@doorward/common/entities/user.entity';
import NewGroup from '../components/NewGroup';
import GroupEntity from '@doorward/common/entities/group.entity';
import { UseBaseRoutes } from '@doorward/ui/hooks/useBaseRoutes';
import { RouteNames } from '@doorward/ui/types';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';
import useApiAction from '@doorward/ui/hooks/useApiAction';

export interface ChatContextType {
  currentUser: UserEntity;
  conversations: Array<Conversation>;
  currentConversation: Conversation;
  newChat: boolean;
  newGroupChat: boolean;
  setCurrentConversation: (conversation: Conversation) => void;
  startNewChat: (open: boolean) => void;
  startNewGroupChat: (open: boolean) => void;
  contacts: Array<Recipient>;
  setContacts: (contacts: Array<Recipient>) => void;
  groups: Array<GroupEntity>;
  setGroups: (groups: Array<GroupEntity>) => void;
  sendMessage: (message: string) => void;
  newMessage: (conversationId: string, message: ChatMessage) => void;
  setConversations: (conversations: Array<Conversation>) => void;
  updateMessage: (messageIds: Array<string>, data: Partial<ChatMessage>) => ChatMessage;
  currentConversationId: string;
  setCurrentConversationId: (currentConversationId: string) => void;
  unreadMessages: Array<ChatMessage>;
  setUnreadMessages: (messages: Array<ChatMessage>) => void;
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
  currentConversationId: null,
  setCurrentConversationId: () => {},
  setContacts: () => {},
  unreadMessages: [],
  setUnreadMessages: () => {},
});

function Chat<T extends RouteNames>(props: ChatProps<T>): JSX.Element {
  const {
    newChat,
    newGroupChat,
    setContacts,
    setCurrentConversation,
    setCurrentConversationId,
    currentConversationId,
    setGroups,
    conversations,
  } = useContext(ChatContext);

  const queryParams = useQueryParams<{ conversation: string }>();

  const fetchContacts = useApiAction(DoorwardChatApi, (api) => api.contacts.getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });

  useEffect(() => {
    if (queryParams.query.conversation) {
      setCurrentConversationId(queryParams.query.conversation);
    }
  }, [queryParams.query.conversation]);

  useEffect(() => {
    queryParams.updateLocation({ conversation: currentConversationId });
  }, [currentConversationId]);

  const fetchGroups = useApiAction(DoorwardChatApi, (api) => api.contacts.getGroupContacts, {
    onSuccess: (data) => {
      setGroups(data.groups);
    },
  });

  useEffect(() => {
    if (currentConversationId) {
      setCurrentConversation(conversations.find((conversation) => conversation.id === currentConversationId));
    }
  }, [currentConversationId, conversations]);

  useEffect(() => {
    fetchContacts.action();
    fetchGroups.action();
  }, []);

  return (
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
  );
}

export interface ChatProps<T extends RouteNames> {
  conversations: Array<Conversation>;
  contacts?: Array<Recipient>;
  currentConversation?: Conversation;
  size?: 'small' | 'medium' | 'large';
  auth: UseAuth;
  routes: UseBaseRoutes<T>;
}

export default Chat;
