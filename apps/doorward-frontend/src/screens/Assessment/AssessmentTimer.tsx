import React, { useState } from 'react';
import Timer from 'react-compound-timer';
import './styles/AssessmentTimer.scss';
import classNames from 'classnames';

const AssessmentTimer: React.FunctionComponent<AssessmentTimerProps> = (props): JSX.Element => {
  const [stage, setStage] = useState('good');
  return (
    <div
      className={classNames({
        'ed-assessment-timer': true,
        [stage]: true,
      })}
    >
      <Timer
        initialTime={props.totalTimeMinutes * 60 * 1000}
        startImmediately
        lastUnit="h"
        direction="backward"
        formatValue={(number) => (number < 10 ? `0${number}` : `${number}`)}
        checkpoints={[
          {
            time: 5 * 60 * 1000,
            callback: () => setStage('warning'),
          },
          {
            time: 60 * 1000,
            callback: () => setStage('danger'),
          },
          {
            time: 0,
            callback: props.onTimeEnded,
          },
        ]}
      >
        <div>
          <span className="time-value hours">
            <Timer.Hours />
          </span>
          <span className="time-unit hours">: </span>
        </div>
        <div>
          <span className="time-value minutes">
            <Timer.Minutes />
          </span>
          <span className="time-unit minutes">:</span>
        </div>
        <div>
          <span className="time-value seconds">
            <Timer.Seconds />
          </span>
        </div>
      </Timer>
    </div>
  );
};

export interface AssessmentTimerProps {
  totalTimeMinutes: number;
  onTimeEnded?: () => void;
}

export default AssessmentTimer;
