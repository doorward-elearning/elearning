import React from 'react';
import { Units } from '@doorward/common/utils/ago';
import moment, { Moment } from 'moment';
import Tools from '@doorward/common/utils/Tools';
import Tooltip from '@doorward/ui/components/Tooltip';

const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = (props): JSX.Element => {
  return (
    <Tooltip title={Tools.normalDateTime(moment(props.time).toDate())}>
      {Tools.humanReadableTime(props.time, props.max || 'minute', props.precise)}
    </Tooltip>
  );
};

export interface TimeDisplayProps {
  time: Date | string | Moment;
  max?: Units;
  precise?: boolean;
}

export default TimeDisplay;
