import React, { MouseEventHandler } from 'react';
import './Empty.scss';
import Icon from '../Icon';
import classNames from 'classnames';
import IfElse from '../IfElse';
import { Icons } from '../../../types/icons';
import Panel from '../Panel';

const defaultMessage = 'Ops! There are no items here.';

const Empty: React.FunctionComponent<EmptyProps> = ({
  message = defaultMessage,
  icon = 'beach_access',
  size = 'large',
  actionMessage,
  onAction,
  children,
}) => {
  return (
    <Panel
      className={classNames({
        'ed-content-empty': true,
        [size]: true,
      })}
    >
      <Icon icon={icon} className="ed-content-empty__icon" />
      <span className="ed-content-empty__message">{message}</span>
      {children}
      <IfElse condition={!!actionMessage}>
        <a className="clickable" onClick={onAction}>
          {actionMessage}
        </a>
      </IfElse>
    </Panel>
  );
};

export interface EmptyProps {
  message?: string;
  icon?: Icons;
  size?: 'small' | 'medium' | 'large';
  actionMessage?: string;
  onAction?: MouseEventHandler;
}

export default Empty;
