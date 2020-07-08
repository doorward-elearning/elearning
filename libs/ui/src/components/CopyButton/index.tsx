import React, { useState } from 'react';
import Icon from '@doorward/ui/components/Icon';
import copyToClipboard from '@doorward/ui/utils/copyToClipboard';
import './CopyButton.scss';

const CopyButton: React.FunctionComponent<CopyButtonProps> = (props): JSX.Element => {
  const [copied, setCopied] = useState(false);
  return (
    <span className="ed-copy-button">
      <Icon
        className={props.className}
        icon={copied ? 'check' : 'file_copy'}
        onClick={() => {
          copyToClipboard(props.text);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1500);
        }}
        title="Copy"
      />
      {copied && <div className="tooltip">Copied</div>}
    </span>
  );
};

export interface CopyButtonProps {
  text: string;
  className?: string;
}

export default CopyButton;
