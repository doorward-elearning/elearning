import React, { FunctionComponent } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import './styles/TextField.scss';
import Icon from '../Icon';
import classNames from 'classnames';

const TextField: FunctionComponent<TextFieldProps> = ({
  value = '',
  className,
  formikProps,
  children,
  ...props
}): JSX.Element => {
  return (
    <div>
      <div
        className={classNames({
          [`${className} eb-input__text`]: true,
          noIcon: !props.icon,
        })}
      >
        <Icon
          icon={props.icon}
          className={classNames({
            'eb-input__text-icon': true,
          })}
        />
        <input type="text" {...props} value={value} autoComplete="off" />
        {children}
      </div>
    </div>
  );
};

export interface TextFieldProps extends InputProps {
  icon?: string;
}

export default withInput<TextFieldProps>(TextField, [InputFeatures.LABEL], { labelPosition: 'top' });

export const PlainTextField = TextField;
