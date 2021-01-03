import React from 'react';
import Timer from 'react-compound-timer';
import TimeDisplay from '@doorward/ui/components/TimeDisplay';

const RealTimeMoment: React.FunctionComponent<RealTimeMomentProps> = ({ ...props }): JSX.Element => {
  return (
    <Timer initialTime={0} timeToUpdate={60000}>
      <TimeDisplay time={props.time} />
    </Timer>
  );
};

export interface RealTimeMomentProps {
  time: Date;
}

export default RealTimeMoment;
