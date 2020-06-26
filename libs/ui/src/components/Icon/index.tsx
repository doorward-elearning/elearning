import React, { MouseEventHandler, MutableRefObject } from 'react';
import classNames from 'classnames';
import './Icon.scss';
import { Icons } from '../../types/icons';

const Icon: React.FunctionComponent<IconProps> = (props): JSX.Element => {
  const className = classNames({
    'material-icons': true,
    [props.className || '']: true,
    clickable: !!props.onClick || props.clickable,
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
  icon?: Icons;
  className?: string;
  onClick?: MouseEventHandler;
  title?: string;
  clickable?: boolean;
  ref?: MutableRefObject<any>;
}

export default Icon;
