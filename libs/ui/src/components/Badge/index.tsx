import React from 'react';
import './Badge.scss';
import classNames from 'classnames';

const Badge: React.FunctionComponent<BadgeProps> = (props) => {
  return <span className={classNames('ed-badge', props.className, props.theme)}>{props.children}</span>;
};

export interface BadgeProps {
  className?: string;
  theme?: 'success';
}

export default Badge;
