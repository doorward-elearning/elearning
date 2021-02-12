import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './ConversationInputForm.scss';
import { BasicTextArea } from '@doorward/ui/components/Input/TextArea';
import Button from '@doorward/ui/components/Buttons/Button';
import translate from '@doorward/common/lang/translate';
import { ChatContext } from '@doorward/chat/Chat';
import { BasicCheckbox } from '@doorward/ui/components/Input/Checkbox';
import LocalStorage from '@doorward/ui/utils/LocalStorage';
import useKeyPress from '@doorward/ui/hooks/useKeyPress';
import KeyCode from '@doorward/common/utils/keyCode';

const ConversationInputForm: React.FunctionComponent<ConversationInputFormProps> = (props): JSX.Element => {
  const { currentConversation } = useContext(ChatContext);
  const [message, setMessage] = useState(LocalStorage.get('chat_messages', {}));
  const [enterIsSend, setEnterIsSend] = useState(!!LocalStorage.get('enter_is_send', false));
  const textAreaRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    LocalStorage.set('chat_messages', message);
  }, [message]);

  useEffect(() => {
    LocalStorage.set('enter_is_send', enterIsSend);
  }, [enterIsSend]);

  const sendMessage = useCallback(() => {
    if (message[currentConversation.id]?.trim()) {
      props.onSendMessage(message[currentConversation.id]);
      setMessage({
        ...message,
        [currentConversation.id]: '',
      });
    }
  }, [message, currentConversation]);

  const onEnter = useCallback(
    (e) => {
      if (enterIsSend) {
        e.preventDefault();
        sendMessage();
      }
    },
    [enterIsSend, sendMessage]
  );

  useKeyPress(KeyCode.ENTER, onEnter, false, textAreaRef?.current);

  return (
    <div className="ed-conversation-input-form">
      <BasicTextArea
        getRef={textAreaRef}
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
        <div>
          <div className="ed-conversation--enter-is-send">
            <BasicCheckbox
              value={enterIsSend}
              onChange={(e) => {
                setEnterIsSend(!!e.target.value);
              }}
            />
            <span>{translate('enterIsSend')}</span>
          </div>
        </div>
        <div>
          <Button disabled={!message[currentConversation.id]?.trim()} theme="primary" onClick={sendMessage}>
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
