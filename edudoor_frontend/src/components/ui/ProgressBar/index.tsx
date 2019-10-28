import React from 'react';
import LinearProgress, { LinearProgressProps } from '@material/react-linear-progress';
import './ProgressBar.scss';

const ProgressBar: React.FunctionComponent<ProgressBarProps<any>> = ({ indeterminate = true }) => {
  return <LinearProgress className="ed-progress" indeterminate={indeterminate} />;
};

export interface ProgressBarProps<T> extends LinearProgressProps<T> {}

export default ProgressBar;
