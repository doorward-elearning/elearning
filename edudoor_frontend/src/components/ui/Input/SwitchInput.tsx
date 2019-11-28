import React from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import Switch from '../Switch';

const SwitchInput: React.FunctionComponent<SwitchInputProps> = props => {
  const handleToggle = (open: boolean): void => {
    props.onChange({ target: { value: open, name: props.name } });
  };
  return (
    <div className="eb-input__switch">
      <Switch open={!!props.value} onToggle={handleToggle} id={props.id} />
    </div>
  );
};

export interface SwitchInputProps extends InputProps {}

export default withInput(SwitchInput, [InputFeatures.LABEL], { labelPosition: 'top' });
