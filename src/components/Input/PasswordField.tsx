import React, { FunctionComponent } from 'react';
import TextField, { TextFieldProps } from './TextField';

const PasswordField: FunctionComponent<PasswordFieldProps> = props => <TextField {...props} type="password" />;

export interface PasswordFieldProps extends TextFieldProps {}

export default PasswordField;
