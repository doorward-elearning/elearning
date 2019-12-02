import React, { useEffect, useRef, useState } from 'react';
import { PlainTextField, TextFieldProps } from './TextField';
import withInput from './index';
import './styles/EditableLabel.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import classNames from 'classnames';
import Icon from '../Icon';
import useToggle, { UseToggle } from '../../../hooks/useToggle';

const EditableLabel: React.FunctionComponent<EditableLabelProps> = props => {
  const Component = props.component || <span />;
  const label = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = props.toggle || useToggle(false);

  useClickOutside(() => {
    setEditing(false);
  }, label);

  useEffect(() => {
    if (label.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      label.current.querySelector('input').focus();
    }
  }, [editing]);

  return (
    <div
      className={classNames({
        'ed-editable-label': true,
        editing,
      })}
      ref={label}
    >
      <div>
        <PlainTextField {...props} />
      </div>
      <div className="ed-editable-label__label">
        {React.cloneElement(Component, {
          children: props.value,
        })}
        <Icon icon="edit" title="Edit" onClick={(): void => setEditing(true)} />
      </div>
    </div>
  );
};

export interface EditableLabelProps extends TextFieldProps {
  component?: JSX.Element;
  editing?: boolean;
  toggle?: [boolean, (value: boolean) => void];
}

export default withInput(EditableLabel);
