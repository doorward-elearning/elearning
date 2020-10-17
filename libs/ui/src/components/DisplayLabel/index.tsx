import React from 'react';
import './DisplayLabel.scss';

const DisplayLabel: React.FunctionComponent<DisplayLabelProps> = (props): JSX.Element => {
  return <div className="ed-display__label">{props.children}</div>;
};

export interface DisplayLabelProps {}

export default DisplayLabel;
