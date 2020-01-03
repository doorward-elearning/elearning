import React from 'react';
import LinearProgress, { LinearProgressProps } from '@material/react-linear-progress';
import './ProgressBar.scss';

const ProgressBar: React.FunctionComponent<ProgressBarProps<any>> = ({ indeterminate = true, ...props }) => {
  return <LinearProgress className="ed-progress" {...{ ...props, indeterminate }} />;
};

export interface ProgressBarProps<T> extends LinearProgressProps<T> {}

export default ProgressBar;
