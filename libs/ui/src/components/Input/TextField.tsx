import React, { FunctionComponent, useEffect } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import './styles/TextField.scss';
import Icon from '../Icon';
import classNames from 'classnames';
import IfElse from '../IfElse';
import Tools from '@edudoor/common/utils/Tools';
import { Icons } from '../../types/icons';

const TextField: FunctionComponent<TextFieldProps> = ({
  value = '',
  className,
  formikProps,
  children,
  editable = true,
  overrideValue,
  ...props
}): JSX.Element => {
  useEffect(() => {
    if (overrideValue !== value) {
      formikProps.setFieldValue(props.name, overrideValue);
    }
  }, [overrideValue]);
  return (
    <div>
      <div
        className={classNames({
          [`${className} eb-input__text`]: true,
          noIcon: !props.icon,
        })}
      >
        <IfElse condition={editable}>
          <input type="text" {...props} value={value == null ? '' : value} autoComplete="off" />
          <span>{Tools.str(value)}</span>
        </IfElse>
        <Icon
          icon={props.icon}
          className={classNames({
            'eb-input__text-icon': true,
          })}
        />
        {children}
      </div>
    </div>
  );
};

export interface TextFieldProps extends InputProps {
  icon?: Icons;
  overrideValue?: string;
}

export default withInput<TextFieldProps>(TextField, [InputFeatures.LABEL], { labelPosition: 'top' });

export const PlainTextField = TextField;
