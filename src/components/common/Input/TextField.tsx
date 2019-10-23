import React, { FunctionComponent } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import './styles/TextField.scss';
import Icon from '../Icon';

const TextField: FunctionComponent<TextFieldProps> = ({
  value = '',
  className,
  formikProps,
  children,
  ...props
}): JSX.Element => {
  return (
    <div>
      <div className={`${className} eb-input__text`}>
        <Icon icon={props.icon} className="eb-input__text-icon" />
        <input type="text" {...props} value={value} autoComplete="off" />
        {children}
      </div>
    </div>
  );
};

export interface TextFieldProps extends InputProps {
  icon?: string;
}

export default withInput<TextFieldProps>(TextField, [InputFeatures.LABEL]);
