import React, { useEffect, useRef, useState } from 'react';
import { PlainTextField, TextFieldProps } from './TextField';
import withInput from './index';
import './styles/EditableLabel.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import classNames from 'classnames';
import Icon from '../Icon';

const EditableLabel: React.FunctionComponent<EditableLabelProps> = props => {
  const Component = props.component || <span />;
  const label = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

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
      <div className="ed-editable-label__label" onClick={(): void => setEditing(true)}>
        {React.cloneElement(Component, {
          children: props.value,
        })}
        <Icon icon="edit" />
      </div>
    </div>
  );
};

export interface EditableLabelProps extends TextFieldProps {
  component?: JSX.Element;
}

export default withInput(EditableLabel);
