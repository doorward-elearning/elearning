import React from 'react';
import Tools from '@doorward/common/utils/Tools';
import Timer from 'react-compound-timer';

const RealTimeMoment: React.FunctionComponent<RealTimeMomentProps> = ({
  render = (str) => str,
  ...props
}): JSX.Element => {
  return (
    <Timer initialTime={0} timeToUpdate={60000}>
      <React.Fragment>{render(Tools.humanReadableTime(props.time))}</React.Fragment>
    </Timer>
  );
};

export interface RealTimeMomentProps {
  render?: (time: string) => JSX.Element | string;
  time: Date;
}

export default RealTimeMoment;
