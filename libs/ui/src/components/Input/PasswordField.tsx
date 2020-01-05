import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField, { TextFieldProps } from './TextField';
import './styles/PasswordField.scss';
import Icon from '../Icon';

const PasswordField: FunctionComponent<PasswordFieldProps> = props => {
  const [visibility, setVisibility] = useState(false);
  const [icon, setIcon] = useState();

  useEffect(() => {
    setIcon(visibility ? 'visibility' : 'visibility_off');
  }, [visibility]);

  const toggleVisibility = (): void => {
    setVisibility(!visibility);
  };

  return (
    <TextField {...props} className="eb-input__password" type={visibility ? 'text' : 'password'}>
      <Icon icon={icon} className="visibility" onClick={toggleVisibility} />
    </TextField>
  );
};

export interface PasswordFieldProps extends TextFieldProps {}

export default PasswordField;
