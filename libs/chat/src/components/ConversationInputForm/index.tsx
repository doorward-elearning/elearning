import React, { useCallback, useState } from 'react';
import './ConversationInputForm.scss';
import { BasicTextArea } from '@doorward/ui/components/Input/TextArea';
import Button from '@doorward/ui/components/Buttons/Button';
import translate from '@doorward/common/lang/translate';

const ConversationInputForm: React.FunctionComponent<ConversationInputFormProps> = (props): JSX.Element => {
  const [message, setMessage] = useState();

  const sendMessage = useCallback(() => {
    props.onSendMessage(message);
    setMessage('');
  }, [message]);

  return (
    <div className="ed-conversation-input-form">
      <BasicTextArea
        placeholder={translate('enterMessage')}
        className="input-field"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div className="ed-conversation-input-form--toolbar">
        <div></div>
        <div>
          <Button disabled={!message} theme="primary" onClick={sendMessage}>
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
