import React, { FunctionComponent } from 'react';
import TextField from './TextField';
import { PasswordFieldProps } from '../components';

const PasswordField: FunctionComponent<PasswordFieldProps> = props => (
  <TextField {...props} type="password" />
);

export default PasswordField;
