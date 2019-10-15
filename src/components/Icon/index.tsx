import React, { MouseEventHandler } from 'react';

const Icon: React.FunctionComponent<IconProps> = (props): JSX.Element => {
  return (
    <React.Fragment>
      {props.icon && (
        <i className={`material-icons ${props.className || ''}`} onClick={props.onClick}>
          {props.icon}
        </i>
      )}
    </React.Fragment>
  );
};

export interface IconProps {
  icon?: string;
  className?: string;
  onClick?: MouseEventHandler;
}

export default Icon;
