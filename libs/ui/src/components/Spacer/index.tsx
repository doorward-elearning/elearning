import React from 'react';
import './Spacer.scss';
import classNames from 'classnames';

const Spacer: React.FunctionComponent<SpacerProps> = (props): JSX.Element => {
  return (
    <div
      className={classNames({
        'ed-spacer': true,
        [props.size || 'default']: true,
        vertical: !!props.vertical,
      })}
    />
  );
};

export interface SpacerProps {
  size?: 'small' | 'default' | 'large';
  vertical?: boolean;
}

export default Spacer;
