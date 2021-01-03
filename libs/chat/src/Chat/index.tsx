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

export interface ChatContextType {
  conversations: Array<Conversation>;
  currentConversation: Conversation;
  newChat: boolean;
  setCurrentConversation: (conversation: Conversation) => void;
  startNewChat: (open: boolean) => void;
  contacts: Array<Recipient>;
  sendMessage: (message: string) => void;
  newMessage: (conversationId: string, message: ChatMessage) => void;
  setConversations: (conversations: Array<Conversation>) => void;
}

export const ChatContext = React.createContext<ChatContextType>({
  conversations: [],
  currentConversation: null,
  newChat: false,
  setCurrentConversation: () => {},
  startNewChat: () => {},
  contacts: [],
  sendMessage: () => {},
  newMessage: () => {},
  setConversations: () => {},
});

const Chat: React.FunctionComponent<ChatProps> = (props): JSX.Element => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>(
    props.currentConversation || props.conversations[0]
  );
  const [conversations, setConversations] = useState(props.conversations);

  const [newChat, startNewChat] = useState(false);

  const [contacts, setContacts] = useState([]);

  const fetchContacts = useAction(DoorwardChatApi.contacts.getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts);
    },
  });

  const newMessage = useCallback(
    (conversationId: string, message: ChatMessage) => {
      const newConversations = [...conversations];
      if (!conversationId) {
        newConversations.push(currentConversation);
      }

      const conversationIndex = conversationId
        ? newConversations.findIndex((conversation) => conversation.id === conversationId)
        : 0;

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

        conversation = { ...conversation, blocks: blocks };

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
      if (currentConversation.id) {
        socket.emit(ChatMessageTypes.SEND_MESSAGE, {
          ...data,
          conversationId: currentConversation.id,
        });
      } else {
        socket.emit(ChatMessageTypes.SEND_MESSAGE_TO_NEW_CONVERSATION, {
          ...data,
          recipientId: currentConversation.recipient.id,
        });
      }

      newMessage(currentConversation.id, {
        timestamp: new Date(),
        text: message,
        status: MessageStatus.SENT,
        me: true,
      });
    },
    [currentConversation]
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
              conversations,
              currentConversation,
              setCurrentConversation,
              newChat,
              startNewChat,
              contacts,
              setConversations,
              sendMessage: (message) => sendMessage(socket, message),
              newMessage,
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
