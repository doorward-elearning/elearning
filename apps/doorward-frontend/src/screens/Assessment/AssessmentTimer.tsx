import React from 'react';
import Timer from 'react-compound-timer';
import './styles/AssessmentTimer.scss';

const AssessmentTimer: React.FunctionComponent<AssessmentTimerProps> = (props): JSX.Element => {
  return (
    <div className="ed-assessment-timer">
      <Timer
        initialTime={props.totalTimeMinutes * 60 * 1000}
        startImmediately
        lastUnit="h"
        direction="backward"
        formatValue={(number) => (number < 10 ? `0${number}` : `${number}`)}
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
}

export default AssessmentTimer;
