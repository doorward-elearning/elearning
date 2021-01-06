import React, { ReactChildren, useCallback, useEffect, useState } from 'react';
import WebSocketComponent from '@doorward/ui/components/WebSocketComponent';
import { ChatMessageBody, ChatMessageTypes } from '@doorward/chat/chat.message.types';
import { ChatMessage, Conversation, MessageStatus } from '@doorward/chat/types';
import {
  addNewMessage,
  deliverMessages,
  getMessagesByStatus,
  sendNewMessage,
  updateExistingMessage,
} from '@doorward/chat/Chat/functions';
import { UseAuth } from '@doorward/ui/hooks/useAuth';
import { ChatContext } from '@doorward/chat/Chat';
import useWebsocketEvent from '@doorward/ui/hooks/useWebsocketEvent';
import useApiAction from '@doorward/ui/hooks/useApiAction';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';

const ChatWebSocketContext: React.FunctionComponent<ChatWebSocketContextProps> = (props): JSX.Element => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const [currentConversationId, setCurrentConversationId] = useState();
  const [conversations, setConversations] = useState([]);
  const [newChat, startNewChat] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newGroupChat, startNewGroupChat] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(props.auth.user);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const { socket } = props;

  const fetchConversations = useApiAction(DoorwardChatApi, 'chat', 'getConversations', {
    onSuccess: (response) => {
      if (response.conversations.length) {
        setConversations(response.conversations);

        deliverMessages(currentUser.id, response.conversations, socket);
      }
    },
  });

  useEffect(() => {
    fetchConversations.action();
  }, []);

  useEffect(() => {
    if (props.auth.user) {
      setCurrentUser(props.auth.user);
    }
  }, [props.auth]);

  useEffect(() => {
    if (conversations?.length) {
      const unread = [];
      conversations.forEach((conversation) => {
        unread.push(...getMessagesByStatus(conversation, MessageStatus.DELIVERED).filter((message) => !message.me));
      });
      setUnreadMessages(unread);
    }
  }, [conversations]);

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

  useWebsocketEvent(
    ChatMessageTypes.NEW_CONVERSATION,
    (conversation: Conversation) => {
      setConversations([conversation, ...conversations]);

      return {
        event: ChatMessageTypes.REGISTER_CONVERSATION,
        data: {
          conversationId: conversation.id,
          userId: currentUser.id,
        },
      };
    },
    [setConversations, conversations]
  );

  useWebsocketEvent(
    ChatMessageTypes.NEW_MESSAGE,
    (message) => {
      newMessage(message.conversationId, {
        ...message,
        status: MessageStatus.DELIVERED,
      });

      const data = {
        conversationId: message.conversationId,
        messageId: message.id,
        timestamp: new Date(),
        userId: currentUser.id,
        messageRead: message.conversationId === currentConversationId,
      };

      return {
        event: ChatMessageTypes.DELIVERY_REPORT,
        data,
      };
    },
    [newMessage, currentConversation]
  );

  useWebsocketEvent<ChatMessageBody[ChatMessageTypes.MESSAGE_CHANGED]>(
    ChatMessageTypes.MESSAGE_CHANGED,
    (data) => {
      updateMessage([data.id], {
        ...data,
      });
    },
    [updateMessage]
  );

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        conversations,
        currentConversation,
        setCurrentConversation,
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
        setContacts,
        setCurrentConversationId,
        currentConversationId,
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export interface ChatWebSocketContextProps {
  auth: UseAuth;
  socket: SocketIOClient.Socket;
  children: ReactChildren | Element | JSX.Element;
}

export default (props: Omit<ChatWebSocketContextProps, 'socket'>) => {
  return props.auth.user ? (
    <WebSocketComponent
      endpoint={process.env.REACT_APP_CHAT_WEBSOCKET_URL}
      initialize={(socket) => {
        socket.emit(ChatMessageTypes.INITIALIZE, {
          userId: props.auth.user.id,
        });
      }}
    >
      {(socket) => (
        <ChatWebSocketContext {...props} socket={socket}>
          {props.children}
        </ChatWebSocketContext>
      )}
    </WebSocketComponent>
  ) : null;
};
