import React, { useCallback, useContext, useEffect, useState } from 'react';
import './ConversationInputForm.scss';
import { BasicTextArea } from '@doorward/ui/components/Input/TextArea';
import Button from '@doorward/ui/components/Buttons/Button';
import translate from '@doorward/common/lang/translate';
import { ChatContext } from '@doorward/chat/Chat';

const ConversationInputForm: React.FunctionComponent<ConversationInputFormProps> = (props): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);
  const [message, setMessage] = useState(JSON.parse(localStorage.getItem('chat_messages') || '{}'));

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(message));
  }, [message]);

  const sendMessage = useCallback(() => {
    props.onSendMessage(message[currentConversation.id]);
    setMessage({
      ...message,
      [currentConversation.id]: '',
    });
  }, [message, currentConversation]);

  return (
    <div className="ed-conversation-input-form">
      <BasicTextArea
        placeholder={translate('enterMessage')}
        className="input-field"
        onChange={(e) =>
          setMessage({
            ...message,
            [currentConversation.id]: e.target.value,
          })
        }
        value={message[currentConversation.id]}
      />
      <div className="ed-conversation-input-form--toolbar">
        <div></div>
        <div>
          <Button disabled={!message[currentConversation.id]} theme="primary" onClick={sendMessage}>
            {translate('send').toUpperCase()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export interface ConversationInputFormProps {
  onSendMessage: (message: string) => void;
}

export default ConversationInputForm;
