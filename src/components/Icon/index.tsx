import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import './Icon.scss';

const Icon: React.FunctionComponent<IconProps> = (props): JSX.Element => {
  const className = classNames({
    'material-icons': true,
    [props.className || '']: true,
    clickable: !!props.onClick,
  });
  return (
    <React.Fragment>
      {props.icon && (
        <i className={className} onClick={props.onClick}>
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
