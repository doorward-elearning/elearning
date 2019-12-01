import React, { useContext } from 'react';
import Icon from '../Icon';
import withInput, { InputFeatures, InputProps } from './index';
import { Icons } from '../../../types/icons';
import Select, { ISelectProps } from 'react-dropdown-select';
import './styles/DropdownSelect.scss';
import './styles/TextField.scss';
import { ThemeContext } from '../ApplicationTheme';

const generateOptionsList = (options: { [name: string]: string }): Array<Option> => {
  return (Object.keys(options) as Array<keyof typeof options>).reduce(
    (acc: any, current) => [...acc, { value: current, label: options[current] }],
    []
  );
};

const generateFromString = (options: any) => {
  return options.map((option: any) => {
    if (option as Option) {
      return option;
    } else {
      return {
        value: option,
        label: option,
      };
    }
  });
};

const getSelectedValue = (options: Array<Option>, multi = false): string | Array<string> => {
  const selected = options.map(option => option.value);
  if (multi) {
    return selected;
  }
  return selected[0];
};

const DropdownSelect: React.FunctionComponent<DropdownSelectProps> = ({
  value = '',
  className,
  children,
  icon,
  options,
  ...props
}): JSX.Element => {
  const theme = useContext(ThemeContext);
  const onChange = (value: Array<Option>) => {
    props.onChange({
      target: {
        name: props.name,
        value: getSelectedValue(value, props.multi),
      },
    });
  };
  const onBlur = () => {
    props.onBlur({
      target: {
        name: props.name,
        value: value,
      },
    });
  };

  const optionsList = options instanceof Array ? generateFromString(options) : generateOptionsList(options);
  return (
    <div className={`${className} eb-input__text--select`}>
      <Icon icon={icon} className="eb-input__text-icon" />
      <div className="eb-input__dropdownSelect">
        <Select
          values={[]}
          options={optionsList}
          {...props}
          onChange={onChange}
          onDropdownClose={onBlur}
          color={theme.theme['--bg-primary-dark']}
        />
      </div>
      {children}
    </div>
  );
};

export type Option = { value: string; label: string; disabled?: boolean };

export type Options = Array<Option> | { [name: string]: string } | Array<string>;

export interface DropdownSelectProps extends InputProps, Omit<ISelectProps, 'options' | 'onChange' | 'values'> {
  icon?: Icons;
  options: Options;
}

export interface DropdownOptionProps {
  option: Option;
}

export default withInput(DropdownSelect, [InputFeatures.LABEL], { labelPosition: 'top' });
