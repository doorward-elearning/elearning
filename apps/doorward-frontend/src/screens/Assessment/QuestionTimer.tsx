import React, { useEffect, useState } from 'react';
import Timer from 'react-compound-timer';
import './styles/AssessmentTimer.scss';
import classNames from 'classnames';
import useInterval from '@doorward/ui/hooks/useInterval';

const QuestionTimer: React.FunctionComponent<QuestionTimerProps> = (props): JSX.Element => {
  const [stage, setStage] = useState('good');
  const [currentTime, setCurrentTime] = useState(props.totalTimeSeconds);

  useInterval(
    () => {
      setCurrentTime(currentTime - 1);
    },
    1000,
    [currentTime]
  );

  useEffect(() => {
    if (props.onTimeUpdate) {
      props.onTimeUpdate(currentTime);
    }
  }, [currentTime]);
  return (
    <div
      className={classNames({
        'ed-assessment-timer': true,
        [stage]: true,
      })}
    >
      <Timer
        initialTime={props.totalTimeSeconds * 1000}
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

export interface QuestionTimerProps {
  totalTimeSeconds: number;
  onTimeEnded?: () => void;
  onTimeUpdate?: (seconds: number) => void;
}

export default QuestionTimer;
