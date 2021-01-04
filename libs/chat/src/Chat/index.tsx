import React, { useCallback, useEffect, useState } from 'react';
import './Chat.scss';
import classNames from 'classnames';
import ConversationList from '../components/ConversationList';
import ConversationFrame from '../components/ConversationFrame';
import { ChatMessage, Conversation, MessageStatus, Recipient } from '@doorward/chat/types';
import NewChat from '@doorward/chat/components/NewChat';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';
import WebSocketComponent from '@doorward/ui/components/WebSocketComponent';
import { ChatMessageTypes } from '@doorward/chat/chat.message.types';
import { UseAuth } from '@doorward/ui/hooks/useAuth';
import Tools from '@doorward/common/utils/Tools';
import UserEntity from '@doorward/common/entities/user.entity';

export interface ChatContextType {
  currentUser: UserEntity;
  conversations: Array<Conversation>;
  currentConversation: Conversation;
  newChat: boolean;
  setCurrentConversation: (conversationIndex: string) => void;
  startNewChat: (open: boolean) => void;
  contacts: Array<Recipient>;
  sendMessage: (message: string) => void;
  newMessage: (conversationId: string, message: ChatMessage) => void;
  setConversations: (conversations: Array<Conversation>) => void;
  updateMessage: (messageId: string, data: Partial<ChatMessage>) => ChatMessage;
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
});

const Chat: React.FunctionComponent<ChatProps> = (props): JSX.Element => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const [currentConversationId, setCurrentConversationId] = useState();
  const [conversations, setConversations] = useState(props.conversations);

  const [newChat, startNewChat] = useState(false);

  const [contacts, setContacts] = useState([]);

  const fetchContacts = useAction(DoorwardChatApi.contacts.getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });

  useEffect(() => {
    if (currentConversationId) {
      setCurrentConversation(conversations.find((conversation) => conversation.id === currentConversationId));
    }
  }, [currentConversationId, conversations]);

  const newMessage = useCallback(
    (conversationId: string, message: ChatMessage) => {
      const newConversations = [...conversations];

      const conversationIndex = newConversations.findIndex((conversation) => conversation.id === conversationId);

      let conversation = newConversations[conversationIndex];

      if (conversation) {
        const blocks = conversation.blocks.length
          ? [...conversation.blocks]
          : [
              {
                day: Tools.humanReadableTime(message.timestamp, 'day'),
                messages: [],
              },
            ];

        const block = blocks[blocks.length - 1];

        block.messages.push(message);

        conversation = { ...conversation, blocks: blocks, lastMessageTimestamp: message.timestamp };

        newConversations[conversationIndex] = conversation;
      }

      setConversations(newConversations);
      setCurrentConversation(currentConversation);
    },
    [conversations, currentConversation]
  );

  const sendMessage = useCallback(
    (socket: SocketIOClient.Socket, message: string) => {
      const data = {
        userId: props.auth.user.id,
        message,
      };
      const id = Tools.generateId();
      socket.emit(ChatMessageTypes.SEND_MESSAGE, {
        ...data,
        conversationId: currentConversation.id,
        recipientId: currentConversation.recipient.id,
        messageId: id,
      });

      newMessage(currentConversation.id, {
        timestamp: new Date(),
        text: message,
        status: MessageStatus.SENDING,
        me: true,
        id,
      });
    },
    [currentConversation]
  );

  const updateMessage = useCallback(
    (messageId: string, data: Partial<ChatMessage>) => {
      let messageResult = null;
      const newConversations = [...conversations].map((conversation) => {
        return {
          ...conversation,
          blocks: [...conversation.blocks].map((block) => {
            return {
              ...block,
              messages: [...block.messages].map((message) => {
                if (message.id === messageId) {
                  messageResult = message;
                  return {
                    ...message,
                    ...data,
                  };
                }
                return message;
              }),
            };
          }),
        };
      });

      setConversations(newConversations);

      return messageResult;
    },
    [conversations, setConversations]
  );

  useEffect(() => {
    fetchContacts();
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
