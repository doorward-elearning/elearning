import React from 'react';
import './DisplayLabel.scss';
import classNames from 'classnames';

const DisplayLabel: React.FunctionComponent<DisplayLabelProps> = (props): JSX.Element => {
  return <span className={classNames('ed-display__label', props.className)}>{props.children}</span>;
};

export interface DisplayLabelProps {
  className?: string;
}

export default DisplayLabel;
