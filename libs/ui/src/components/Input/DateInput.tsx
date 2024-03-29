import React, { FunctionComponent, useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import withInput, { InputFeatures, InputProps } from './index';
import Icon from '../Icon';
import classNames from 'classnames';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/DateInput.scss';
import './styles/TextField.scss';
import { Icons } from '../../types/icons';
import Tools from '@doorward/common/utils/Tools';

const DateInput: FunctionComponent<DateInputProps> = (props): JSX.Element => {
  const [date, setDate] = useState<Date | null>(props.value ? moment(props.value).toDate() : null);
  useEffect(() => {
    const value = date && date.toString() === 'Invalid Date' ? null : date;
    props.onChange({ target: { value, name: props.name } });
  }, [date]);

  let dateFormat;
  if (props.shortDate) {
    dateFormat = 'd/M/y hh:mm aa';
  } else if (props.mediumDate) {
    dateFormat = 'd MMMM yyyy hh:mm aa';
  } else {
    //eslint-disable-next-line
    dateFormat = `do MMMM yyyy 'at' hh:mm aa`;
  }
  return (
    <div className="ed-datePicker eb-input__text">
      {props.editable ? (
        <React.Fragment>
          <DatePicker
            dateFormat={dateFormat}
            showDisabledMonthNavigation
            timeFormat="hh:mm aa"
            {...props}
            onChange={setDate}
            autoComplete="off"
            selected={date}
          />
          <Icon
            icon="calendar_today"
            className={classNames({
              'eb-input__text-icon': true,
            })}
          />
        </React.Fragment>
      ) : (
        <span className="ed-datePicker__display">{props.value ? Tools.normalDateTime(props.value) : '---'}</span>
      )}
    </div>
  );
};

export interface DateInputProps extends Omit<ReactDatePickerProps, 'onChange'>, InputProps {
  icon?: Icons;
  mediumDate?: boolean;
  shortDate?: boolean;
  longDate?: boolean;
}

export default withInput(DateInput, [InputFeatures.LABEL], { labelPosition: 'top' });
