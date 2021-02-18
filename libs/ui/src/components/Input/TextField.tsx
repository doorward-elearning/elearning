import React, { FunctionComponent, useEffect } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import './styles/TextField.scss';
import Icon from '../Icon';
import classNames from 'classnames';
import IfElse from '../IfElse';
import Tools from '@doorward/common/utils/Tools';
import { Icons } from '../../types/icons';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';

const TextField: FunctionComponent<TextFieldProps> = ({
  value = '',
  className,
  formikProps,
  children,
  editable = true,
  overrideValue,
  labelPosition,
  noEdit,
  fluid,
  ...props
}): JSX.Element => {
  useEffect(() => {
    if (overrideValue !== value && formikProps && overrideValue) {
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
          <input type="text" {...props} value={value == null ? '' : value} autoComplete="off" ref={props.inputRef} />
          <DisplayLabel>{Tools.str(value)}</DisplayLabel>
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
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default withInput<TextFieldProps>(TextField, [InputFeatures.LABEL], { labelPosition: 'top' }, true);

export const PlainTextField = TextField;
