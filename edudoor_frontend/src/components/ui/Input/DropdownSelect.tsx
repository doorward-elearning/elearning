import React, { useContext } from 'react';
import Icon from '../Icon';
import withInput, { InputFeatures, InputProps } from './index';
import { Icons } from '../../../types/icons';
import Select, { ISelectProps } from 'react-dropdown-select';
import './styles/DropdownSelect.scss';
import './styles/TextField.scss';
import { ThemeContext } from '../ApplicationTheme';

const DropdownSelect: React.FunctionComponent<DropdownSelectProps> = ({
  value = '',
  className,
  children,
  icon,
  options,
  ...props
}): JSX.Element => {
  const theme = useContext(ThemeContext);
  const onChange = () => {};
  return (
    <div className={`${className} eb-input__text--select`}>
      <Icon icon={icon} className="eb-input__text-icon" />
      <div className="eb-input__dropdownSelect">
        <Select values={[]} options={options} onChange={onChange} {...props} color={theme.theme['--bg-primary-dark']} />
      </div>
      {children}
    </div>
  );
};

export type Option = any;
export interface DropdownSelectProps extends InputProps, Omit<ISelectProps, 'options' | 'onChange' | 'values'> {
  icon?: Icons;
  options: Array<Option>;
}

export interface DropdownOptionProps {
  option: Option;
}

export default withInput(DropdownSelect, [InputFeatures.LABEL], { labelPosition: 'top' });
