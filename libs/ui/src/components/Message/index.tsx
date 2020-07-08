import React, { useEffect, useState } from 'react';
import './Message.scss';
import Icon from '@doorward/ui/components/Icon';
import IfElse from '@doorward/ui/components/IfElse';

const Message: React.FunctionComponent<MessageProps> = (props): JSX.Element => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) {
      props.onClose && props.onClose();
    }
  }, [show]);

  return (
    <IfElse condition={show}>
      <div className="ed-message success">
        <div className="ed-message__content">{props.children}</div>
        <Icon icon="close" title="Hide" onClick={() => setShow(false)} />
      </div>
    </IfElse>
  );
};

export interface MessageProps {
  onClose?: () => void;
}

export default Message;
