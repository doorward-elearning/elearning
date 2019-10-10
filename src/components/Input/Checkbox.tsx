import withInput, { InputProps } from './index';
import { FunctionComponent, useEffect, useState } from 'react';
import * as React from 'react';
import Tools from '../../utils/Tools';

const Checkbox: FunctionComponent<CheckboxProps> = props => {
  const [id, setId] = useState(props.id);
  useEffect(() => {
    if (!id) {
      setId(Tools.randomString());
    }
  });

  return (
    <div className="contact100-form-checkbox">
      <input type="checkbox" className="input-checkbox100" {...props} id={id} />
      <label className="label-checkbox100" htmlFor={id}>
        {props.label}
      </label>
    </div>
  );
};

export interface CheckboxProps extends InputProps {
  label?: string;
}
export default withInput<CheckboxProps>(Checkbox);
