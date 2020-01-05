import React, { useEffect, useRef } from 'react';
import { PlainTextField, TextFieldProps } from './TextField';
import withInput from './index';
import './styles/EditableLabel.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import IfElse from '../IfElse';
import useClickOutside from '../../hooks/useClickOutside';

const EditableLabel: React.FunctionComponent<EditableLabelProps> = props => {
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
    >
      <div>
        <PlainTextField {...props} />
      </div>
      <div className="ed-editable-label__label">
        {React.cloneElement(Component, {
          children: props.value,
        })}
        <IfElse condition={!props.noEdit}>
          <Icon icon="edit" title="Edit" onClick={(): void => setEditing(true)} />
        </IfElse>
      </div>
    </div>
  );
};

export interface EditableLabelProps extends TextFieldProps {
  component?: JSX.Element;
  editing?: boolean;
  toggle: [boolean, (value: boolean) => void];
  noEdit?: boolean;
}

export default withInput(EditableLabel);
