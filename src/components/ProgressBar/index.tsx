import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ progress, buffer, indeterminate }) => {
  const progressRef = useRef(null);
  const setProgress = (): void => {
    if (progressRef) {
      const current: any = progressRef.current;
      if (current.MaterialProgress) {
        current.MaterialProgress.setProgress(progress);
        current.MaterialProgress.setBuffer(buffer);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mdl-componentupgraded', () => {
      setProgress();
    });
  });

  useEffect(() => {
    setProgress();
  }, [progress, buffer]);

  const classes = classNames({
    'mdl-progress': true,
    'mdl-js-progress': true,
    'mdl-progress__indeterminate': indeterminate,
  });
  return <div className={classes} ref={progressRef} />;
};

export interface ProgressBarProps {
  progress?: number;
  buffer?: number;
  indeterminate?: boolean;
}

export default ProgressBar;
