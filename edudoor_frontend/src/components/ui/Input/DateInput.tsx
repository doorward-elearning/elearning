import React, { FunctionComponent } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import './styles/DateInput.scss';
import './styles/TextField.scss';

import 'react-datepicker/dist/react-datepicker.css';
import withInput, { InputFeatures } from './index';
import Icon from '../Icon';
import { Icons } from '../../../types/icons';

const DateInput: FunctionComponent<DateInputProps> = (props): JSX.Element => {
  return (
    <div className="ed-datePicker eb-input__text">
      <Icon icon="calendar_today" />
      <DatePicker {...props} />
    </div>
  );
};

export interface DateInputProps extends ReactDatePickerProps {
  icon?: Icons;
}

export default withInput(DateInput, [InputFeatures.LABEL]);
