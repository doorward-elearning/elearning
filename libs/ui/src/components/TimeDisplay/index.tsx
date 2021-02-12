import React from 'react';
import { Units } from '@doorward/common/utils/ago';
import { Moment } from 'moment';
import Tools from '@doorward/common/utils/Tools';
import moment from 'moment';

const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = (props): JSX.Element => {
  return (
    <span title={Tools.normalDateTime(moment(props.time).toDate())}>
      {Tools.humanReadableTime(props.time, props.max || 'minute', props.precise)}
    </span>
  );
};

export interface TimeDisplayProps {
  time: Date | string | Moment;
  max?: Units;
  precise?: boolean;
}

export default TimeDisplay;
