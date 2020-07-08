import withInput, { InputFeatures, InputProps } from './index';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './styles/Checkbox.scss';
import Tools from '@doorward/common/utils/Tools';

const Checkbox: FunctionComponent<CheckboxProps> = ({ formikProps, ...props }) => {
  return (
    <div className="checkbox__container">
      <input
        type="checkbox"
        {...props}
        checked={!!props.value}
        onChange={e => {
          props.onChange({ ...e, target: { ...e.target, value: !props.value, name: props.name } });
        }}
      />
      <span className="ed-checkbox__checkbox" />
    </div>
  );
};

export interface CheckboxProps extends InputProps {
  label?: string;
}
export default withInput<CheckboxProps>(Checkbox, [InputFeatures.LABEL], {
  labelPosition: 'right',
  idGenerator: Tools.randomString,
  className: 'ed-checkbox',
});
