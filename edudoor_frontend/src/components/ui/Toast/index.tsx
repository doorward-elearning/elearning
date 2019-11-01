import React, { MouseEventHandler } from 'react';
import './Toast.scss';
import classNames from 'classnames';
import Icon from '../Icon';

const Toast: React.FunctionComponent<ToastProps> = props => {
  const className = classNames({
    'ed-toast': true,
    ['v-' + (props.vPosition || 'top')]: true,
    ['h-' + (props.hPosition || 'right')]: true,
    [props.type || 'info']: true,
  });
  return (
    <div className={className}>
      <div className="text">Something went wrong. Please try again</div>
      <Icon icon="close" onClick={props.closeToast} />
    </div>
  );
};

export interface ToastProps {
  vPosition?: 'top' | 'bottom' | 'center';
  hPosition?: 'right' | 'left' | 'center';
  closeToast?: MouseEventHandler;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default Toast;
