import React from 'react';
import Icon from '../Icon';
import './styles/TextField.scss';
import withInput, { InputFeatures, InputProps } from './index';
import { Icons } from '../../../types/icons';

const Option: React.FunctionComponent<DropdownOptionProps> = ({ option }): JSX.Element => {
  let name = '',
    value = '';
  if (option.constructor === String) {
    name = option;
    value = option;
  }
  return <option value={value}>{name}</option>;
};

const DropdownSelect: React.FunctionComponent<DropdownSelectProps> = ({
  value = '',
  className,
  children,
  icon,
  options,
  ...props
}): JSX.Element => {
  return (
    <div className={`${className} eb-input__text eb-input__text--select`}>
      <Icon icon={icon} className="eb-input__text-icon" />
      <select value={value} {...props}>
        {options.map(option => (
          <Option key={option} option={option} />
        ))}
      </select>
      {children}
    </div>
  );
};

export type Option = string;
export interface DropdownSelectProps extends InputProps {
  icon?: Icons;
  options: Array<Option>;
}

export interface DropdownOptionProps {
  option: Option;
}

export default withInput(DropdownSelect, [InputFeatures.LABEL], { labelPosition: 'top' });
