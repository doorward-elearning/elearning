import React, { useEffect, useRef } from 'react';
import { PlainTextField, TextFieldProps } from './TextField';
import withInput from './index';
import './styles/EditableLabel.scss';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

const EditableLabel: React.FunctionComponent<EditableLabelProps> = (props) => {
  const Component = props.component || <span />;
  const label = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = props.toggle;

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
      onClick={(e): void => {
        e.stopPropagation();
        setEditing(true);
      }}
    >
      <div>
        <PlainTextField {...props} />
      </div>
      <div className="ed-editable-label__label">
        {React.cloneElement(Component, {
          children: props.value,
        })}
      </div>
    </div>
  );
};

export interface EditableLabelProps extends TextFieldProps {
  component?: JSX.Element;
  editing?: boolean;
  toggle: [boolean, (value: boolean) => void];
  noEdit?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default withInput(EditableLabel);
