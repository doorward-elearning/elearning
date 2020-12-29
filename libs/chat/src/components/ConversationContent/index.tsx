import React, { useContext, useEffect, useRef } from 'react';
import './ConversationContent.scss';
import ConversationInputForm from '@doorward/chat/components/ConversationInputForm';
import { ChatContext } from '@doorward/chat/Chat';
import ConversationMessageBlock from '@doorward/chat/components/ConversationMessageBlock';

const ConversationContent: React.FunctionComponent<ConversationContentProps> = (props): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);
  const conversationList = useRef();

  useEffect(() => {
    if (conversationList.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // conversationList.current.scrollTop = conversationList.current.scrollHeight;
    }
  }, [currentConversation, conversationList]);
  return currentConversation ? (
    <div className="ed-conversation-content">
      <div className="ed-conversation-content--messages" ref={conversationList}>
        <div className="ed-conversation-content--messages-list">
          {currentConversation.blocks.map((block) => (
            <ConversationMessageBlock block={block} />
          ))}
        </div>
      </div>
      <div className="ed-conversation-content--input">
        <ConversationInputForm />
      </div>
    </div>
  ) : null;
};

export interface ConversationContentProps {}

export default ConversationContent;
