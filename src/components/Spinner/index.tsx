import React from 'react';
import classNames from 'classnames';

const Spinner: React.FunctionComponent<SpinnerProps> = ({ singleColor }) => {
  const classes = classNames({
    'mdl-spinner': true,
    'mdl-js-spinner': true,
    'is-active': true,
    'mdl-spinner--single-color': singleColor,
  });
  return <div className={classes} />;
};

export interface SpinnerProps {
  singleColor?: boolean;
}

export default Spinner;
