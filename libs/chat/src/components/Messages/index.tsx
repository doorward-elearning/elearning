import React from 'react';
import './Messages.scss';

const Messages: React.FunctionComponent<MessagesProps> = (props): JSX.Element => {
  return (
    <div className="ed-messages"></div>
  );
};

export interface MessagesProps {
}

export default Messages;
