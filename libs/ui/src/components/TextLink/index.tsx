import React, { MouseEventHandler } from 'react';
import './TextLink.scss';

const TextLink: React.FunctionComponent<TextLinkProps> = (props): JSX.Element => {
  return (
    <span className="ed-text-link" onClick={props.onClick}>
      {props.children}
    </span>
  );
};

export interface TextLinkProps {
  onClick: MouseEventHandler;
}

export default TextLink;
