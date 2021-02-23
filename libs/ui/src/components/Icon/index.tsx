import React, { MouseEventHandler, MutableRefObject } from 'react';
import classNames from 'classnames';
import './Icon.scss';
import { Icons } from '../../types/icons';
import Tooltip from '@doorward/ui/components/Tooltip';

const Icon: React.FunctionComponent<IconProps> = (props): JSX.Element => {
  const className = classNames({
    'material-icons': true,
    [props.className || '']: true,
    clickable: !!props.onClick || props.clickable,
  });
  return (
    <React.Fragment>
      {props.icon && (
        <Tooltip title={props.title}>
          <i className={className} onClick={props.onClick}>
            {props.icon}
          </i>
        </Tooltip>
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
