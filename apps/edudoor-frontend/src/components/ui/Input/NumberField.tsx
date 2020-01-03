import React from 'react';
import TextField, { TextFieldProps } from './TextField';

const NumberField: React.FunctionComponent<NumberFieldProps> = props => {
  return <TextField type="number" {...props} />;
};

export interface NumberFieldProps extends TextFieldProps {}

export default NumberField;
