import React, { MouseEventHandler } from 'react';
import './Toast.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import IfElse from '../IfElse';

const Toast: React.FunctionComponent<ToastProps> = props => {
  const className = classNames({
    'ed-toast': true,
    ['v-' + (props.vPosition || 'top')]: true,
    ['h-' + (props.hPosition || 'right')]: true,
    [props.type || 'info']: true,
  });
  return (
    <div className={className}>
      <div className="toast__text">{props.message}</div>
      <IfElse condition={!props.static}>
        <Icon icon="close" onClick={props.closeToast} />
      </IfElse>
    </div>
  );
};

export interface ToastProps {
  vPosition?: 'top' | 'bottom' | 'center';
  hPosition?: 'right' | 'left' | 'center';
  closeToast?: MouseEventHandler;
  message: string;
  type?: 'success' | 'info' | 'error';
  static?: boolean;
}

export default Toast;
