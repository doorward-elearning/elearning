import React, { FunctionComponent, useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import withInput, { InputFeatures, InputProps } from './index';
import Icon from '../Icon';
import { Icons } from '../../../types/icons';
import classNames from 'classnames';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/DateInput.scss';
import './styles/TextField.scss';

const DateInput: FunctionComponent<DateInputProps> = (props): JSX.Element => {
  const [date, setDate] = useState<Date | null>(props.value ? moment(props.value).toDate() : null);
  useEffect(() => {
    const value = date && date.toString() === 'Invalid Date' ? null : date;
    props.onChange({ target: { value, name: props.name } });
  }, [date]);
  return (
    <div className="ed-datePicker eb-input__text">
      <Icon
        icon="calendar_today"
        className={classNames({
          'eb-input__text-icon': true,
        })}
      />
      <DatePicker
        dateFormat="do MMMM yyyy 'at' hh:mm aa"
        showDisabledMonthNavigation
        timeFormat="hh:mm aa"
        {...props}
        onChange={setDate}
        selected={date}
      />
    </div>
  );
};

export interface DateInputProps extends Omit<ReactDatePickerProps, 'onChange'>, InputProps {
  icon?: Icons;
}

export default withInput(DateInput, [InputFeatures.LABEL], { labelPosition: 'top' });
