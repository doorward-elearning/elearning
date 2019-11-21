import React, { FunctionComponent } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import './styles/DateInput.scss';
import './styles/TextField.scss';

import 'react-datepicker/dist/react-datepicker.css';
import withInput, { InputFeatures } from './index';

const DateInput: FunctionComponent<DateInputProps> = (props): JSX.Element => {
  return (
    <div className="ed-datePicker">
      <DatePicker {...props} />
    </div>
  );
};

export interface DateInputProps extends ReactDatePickerProps {}

export default withInput(DateInput, [InputFeatures.LABEL]);
