import withInput, { InputFeatures, InputProps } from './index';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './styles/Checkbox.scss';
import Tools from '@doorward/common/utils/Tools';
import classNames from 'classnames';

const Checkbox: FunctionComponent<CheckboxProps> = ({
  formikProps,
  idGenerator,
  labelPosition,
  editable,
  ...props
}) => {
  return (
    <div
      className={classNames({
        'ed-checkbox': true,
        [props.theme || 'accent']: true,
      })}
    >
      <div className="checkbox__container">
        <input
          type="checkbox"
          {...props}
          checked={!!props.value}
          onChange={(e) => {
            props.onChange({ ...e, target: { ...e.target, value: !props.value, name: props.name } });
          }}
        />
        <span className="ed-checkbox__checkbox" />
      </div>
    </div>
  );
};

export interface CheckboxProps extends InputProps {
  label?: string;
  theme?: 'primary';
}

export const BasicCheckbox = Checkbox;

export default withInput<CheckboxProps>(Checkbox, [InputFeatures.LABEL], {
  labelPosition: 'right',
  idGenerator: Tools.randomString,
  className: 'ed-checkbox',
});
