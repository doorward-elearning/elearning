import React from 'react';
import classNames from 'classnames';
import './Pill.scss';

const Pill: React.FunctionComponent<PillProps> = props => {
  return (
    <span
      className={classNames({
        'ed-pill': true,
        [props.className || '']: true,
      })}
    >
      {props.children}
    </span>
  );
};

export interface PillProps {
  className?: string;
}

export default Pill;
