import React from 'react';
import './Badge.scss';
import classNames from 'classnames';

const Badge: React.FunctionComponent<BadgeProps> = (props) => {
  return (
    <span
      className={classNames({
        'ed-badge': true,
        [props.className]: true,
      })}
    >
      {props.children}
    </span>
  );
};

export interface BadgeProps {
  className?: string;
}

export default Badge;
