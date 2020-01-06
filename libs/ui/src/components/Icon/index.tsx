import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import './Icon.scss';
import { Icons } from '../../types/icons';

const Icon: React.FunctionComponent<IconProps> = (props): JSX.Element => {
  const className = classNames({
    'material-icons': true,
    [props.className || '']: true,
    clickable: !!props.onClick,
  });
  return (
    <React.Fragment>
      {props.icon && (
        <i className={className} onClick={props.onClick} title={props.title}>
          {props.icon}
          <i className="material-icons">{props.icon}</i>
        </i>
      )}
    </React.Fragment>
  );
};

export interface IconProps {
  icon?: Icons;
  className?: string;
  onClick?: MouseEventHandler;
  title?: string;
}

export default Icon;
