import React, { useContext, useEffect, useState } from 'react';
import Icon from '../Icon';
import withInput, { InputFeatures, InputProps } from './index';
import Select, { SelectProps } from 'react-dropdown-select';
import './styles/DropdownSelect.scss';
import './styles/TextField.scss';
import { ThemeContext } from '../ApplicationTheme';
import { Icons } from '../../types/icons';
import { Omit } from '@doorward/common/types';

const generateOptionsList = (options: { [name: string]: string }): Array<Option> => {
  return (Object.keys(options) as Array<keyof typeof options>).reduce(
    (acc: any, current) => [...acc, { value: current, label: options[current] }],
    []
  );
};

const generateFromString = (options: any) => {
  return options
    .filter((option: any) => option)
    .map((option: any) => {
      if ((option as Option).label) {
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
  const selected = options.map((option) => option.value);
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
  pattern,
  options,
  ...props
}): JSX.Element => {
  const theme = useContext(ThemeContext);
  const [optionsList, setOptionsList] = useState([]);
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

  useEffect(() => {
    setOptionsList(options instanceof Array ? generateFromString(options) : generateOptionsList(options));
  }, [options]);

  return (
    <div className={`${className} eb-input__text--select`}>
      <Icon icon={icon} className="eb-input__text-icon" />
      <div className="eb-input__dropdownSelect">
        <Select
          values={
            props.multi
              ? value
                ? value
                : []
              : [optionsList.find((option: any) => option.value === value)].filter((x) => x)
          }
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

export interface DropdownSelectProps extends InputProps, Omit<SelectProps<Option>, 'options' | 'onChange' | 'values'> {
  icon?: Icons;
  options: Options;
}

export interface DropdownOptionProps {
  option: Option;
}

export default withInput(DropdownSelect, [InputFeatures.LABEL], { labelPosition: 'top' });
