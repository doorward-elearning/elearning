import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField, { TextFieldProps } from './TextField';
import './styles/PasswordField.scss';
import Icon from '../Icon';
import IfElse from '@doorward/ui/components/IfElse';
import Button from '@doorward/ui/components/Buttons/Button';
import Row from '@doorward/ui/components/Row';
import Tools from '@doorward/common/utils/Tools';
import translate from '@doorward/common/lang/translate';

const PasswordField: FunctionComponent<PasswordFieldProps> = (props) => {
  const [visibility, setVisibility] = useState(props.showPassword);
  const [icon, setIcon] = useState();
  const [generatedPassword, setGeneratedPassword] = useState('');

  useEffect(() => {
    setIcon(visibility ? 'visibility' : 'visibility_off');
  }, [visibility]);

  const toggleVisibility = (): void => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <TextField
        {...props}
        overrideValue={generatedPassword}
        className="eb-input__password"
        type={visibility ? 'text' : 'password'}
      >
        <Icon icon={icon} className="visibility" onClick={toggleVisibility} />
      </TextField>
      <IfElse condition={props.showGenerator}>
        <Button
          mini
          tooltip={translate('generateAStrongPassword')}
          type="button"
          style={{ display: 'block' }}
          onClick={() => {
            setGeneratedPassword(Tools.generatePassword());
          }}
        >
          {translate('generatePassword')}
        </Button>
      </IfElse>
    </div>
  );
};

export interface PasswordFieldProps extends TextFieldProps {
  showPassword?: boolean;
  showGenerator?: boolean;
}

export default PasswordField;
