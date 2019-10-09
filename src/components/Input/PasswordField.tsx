import React, {FunctionComponent} from 'react';
import { PasswordFieldProps } from '../../types';
import TextField from './TextField';

const PasswordField: FunctionComponent<PasswordFieldProps> = (props) => (
  <TextField {...props} type="password"/>
);

export default PasswordField;
