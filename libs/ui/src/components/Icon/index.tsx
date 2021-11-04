import React, { MouseEventHandler, MutableRefObject, useRef } from 'react';
import classNames from 'classnames';
import './Icon.scss';
import { Icons } from '../../types/icons';
import Tooltip from '@doorward/ui/components/Tooltip';

const Icon: React.FunctionComponent<IconProps> = (props): JSX.Element => {
  const className = classNames({
    'material-icons': true,
    [props.className || '']: true,
    clickable: !!props.onClick || props.clickable,
    disabled: props.disabled,
  });
  const ref = useRef();

  return (
    <React.Fragment>
      {props.icon && (
        <Tooltip title={props.title} parentRef={ref}>
          <i className={className} onClick={props.onClick} ref={ref}>
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
  disabled?: boolean;
}

export default Icon;
