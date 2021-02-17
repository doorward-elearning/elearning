import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField, { TextFieldProps } from './TextField';
import './styles/PasswordField.scss';
import Icon from '../Icon';
import Tools from '@doorward/common/utils/Tools';
import translate from '@doorward/common/lang/translate';
import Dropdown from '@doorward/ui/components/Dropdown';
import Panel from '@doorward/ui/components/Panel';

const PasswordField: FunctionComponent<PasswordFieldProps> = (props) => {
  const [visibility, setVisibility] = useState(props.showPassword);
  const [icon, setIcon] = useState();
  const [generatedPassword] = useState(Tools.generatePassword());
  const [useGeneratedPassword, setUseGeneratedPassword] = useState(false);

  useEffect(() => {
    setIcon(visibility ? 'visibility' : 'visibility_off');
  }, [visibility]);

  const toggleVisibility = (): void => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <Dropdown>
        <TextField
          {...props}
          overrideValue={useGeneratedPassword ? generatedPassword : undefined}
          className="eb-input__password"
          type={visibility ? 'text' : 'password'}
        >
          <Icon icon={icon} className="visibility" onClick={toggleVisibility} />
        </TextField>
        {props.showGenerator && (
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setUseGeneratedPassword(true);
              }}
            >
              <div className="password-generator">
                <div>{translate('useSuggestedPassword')}</div>
                <span className="suggestedPassword">{generatedPassword}</span>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export interface PasswordFieldProps extends TextFieldProps {
  showPassword?: boolean;
  showGenerator?: boolean;
}

export default PasswordField;
