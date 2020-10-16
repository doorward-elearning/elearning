import withInput, { InputFeatures, InputProps } from './index';
import * as React from 'react';
import { FunctionComponent, useRef } from 'react';
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
  const checkbox = useRef();
  if (props.name === 'answers[0].correct') {
    console.log(props.value);
  }
  return (
    <div
      className={classNames({
        'ed-checkbox': true,
        [props.theme || 'accent']: true,
      })}
    >
      <div className="checkbox__container">
        <input
          ref={checkbox}
          type="checkbox"
          {...props}
          checked={!!props.value}
          onChange={(e) => {
            props.onChange({ ...e, target: { ...e.target, value: !props.value, name: props.name } });
          }}
        />
        <span
          className="ed-checkbox__checkbox"
          onClick={(e) => {
            e.stopPropagation();
            if (checkbox.current) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              checkbox.current.doClick();
            }
          }}
        />
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
