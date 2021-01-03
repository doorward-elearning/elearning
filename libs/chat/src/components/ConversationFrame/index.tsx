import React, { useContext, useEffect } from 'react';
import './ConversationFrame.scss';
import ConversationHeader from '@doorward/chat/components/ConversationHeader';
import ConversationContent from '@doorward/chat/components/ConversationContent';
import { ChatContext } from '@doorward/chat/Chat';
import { WebSocketContext } from '@doorward/ui/components/WebSocketComponent';
import { ChatMessageTypes } from '@doorward/chat/chat.message.types';

const ConversationFrame: React.FunctionComponent<ConversationFrameProps> = (props): JSX.Element => {
  const { newMessage } = useContext(ChatContext);
  const { socket } = useContext(WebSocketContext);

  useEffect(() => {
    const emitter = socket.once(ChatMessageTypes.SEND_MESSAGE, (message) => {
      newMessage(message.conversationId, {
        ...message,
      });
    });

    return () => emitter.removeAllListeners();
  }, [newMessage]);
  return (
    <div className="ed-conversation-frame">
      <ConversationHeader />
      <ConversationContent />
    </div>
  );
};

export interface ConversationFrameProps {}

export default ConversationFrame;
