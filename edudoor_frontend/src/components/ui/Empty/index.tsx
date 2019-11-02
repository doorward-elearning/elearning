import React from 'react';
import './Empty.scss';
import Icon from '../Icon';
import classNames from 'classnames';

const defaultMessage = 'Ops! There are no items here.';

const Empty: React.FunctionComponent<EmptyProps> = ({
  message = defaultMessage,
  icon = 'beach_access',
  size = 'large',
}) => {
  return (
    <div
      className={classNames({
        'ed-content-empty': true,
        [size]: true,
      })}
    >
      <Icon icon={icon} className="ed-content-empty__icon" />
      <span className="ed-content-empty__message">{message}</span>
    </div>
  );
};

export interface EmptyProps {
  message?: string;
  icon?: string;
  size?: 'small' | 'medium' | 'large';
}

export default Empty;
