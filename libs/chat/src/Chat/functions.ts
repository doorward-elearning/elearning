import { ChatMessage, Conversation, MessageStatus } from '@doorward/chat/types';
import { ChatMessageTypes } from '@doorward/chat/chat.message.types';
import Tools from '@doorward/common/utils/Tools';
import GroupEntity from '@doorward/common/entities/group.entity';

export const getMessagesByStatus = (conversation: Conversation, status: MessageStatus): Array<ChatMessage> => {
  const messages = [];

  conversation.blocks.forEach((block) => {
    block.messages.forEach((message) => {
      if (message.status === status) {
        messages.push(message);
      }
    });
  });
  return messages;
};

export const deliverMessages = (userId: string, conversations: Array<Conversation>, socket: SocketIOClient.Socket) => {
  conversations.forEach((conversation) => {
    socket.emit(ChatMessageTypes.DELIVERY_REPORT, {
      conversationId: conversation.id,
      userId,
      timestamp: new Date(),
    });
  });
};

export const readMessages = (userId: string, conversations: Array<Conversation>, socket: SocketIOClient.Socket) => {
  conversations.forEach((conversation) => {
    socket.emit(ChatMessageTypes.READ_REPORT, {
      conversationId: conversation.id,
      timestamp: new Date(),
      userId,
    });
  });
};

export const sendNewMessage = (
  userId: string,
  currentConversation: Conversation,
  newMessage: (conversationId: string, message: ChatMessage) => void,
  socket: SocketIOClient.Socket,
  message: string
) => {
  const data = {
    userId,
    message,
  };
  const id = Tools.generateId();
  socket.emit(ChatMessageTypes.SEND_MESSAGE, {
    ...data,
    conversationId: currentConversation.id,
    recipientId: currentConversation.recipient.id,
    messageId: id,
    directMessage: currentConversation.directMessage,
  });

  newMessage(currentConversation.id, {
    timestamp: new Date(),
    text: message,
    status: MessageStatus.SENDING,
    me: true,
    id,
  });
};

export const addNewMessage = (
  conversations: Array<Conversation>,
  setConversations: (conversations: Array<Conversation>) => void,
  currentConversation: Conversation,
  setCurrentConversation: (conversation: Conversation) => void,
  conversationId: string,
  message: ChatMessage
) => {
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
};

export const updateExistingMessage = (
  conversations: Array<Conversation>,
  setConversations: (conversations: Array<Conversation>) => void,
  messageIds: Array<string>,
  data: Partial<ChatMessage>
) => {
  let messageResult = null;
  const newConversations = [...conversations].map((conversation) => {
    return {
      ...conversation,
      blocks: [...conversation.blocks].map((block) => {
        return {
          ...block,
          messages: [...block.messages].map((message) => {
            if (messageIds.includes(message.id)) {
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
};

export const formatRecipients = (group: GroupEntity) => {
  return group.members?.map((member) => member?.member?.fullName).join(' , ');
};
