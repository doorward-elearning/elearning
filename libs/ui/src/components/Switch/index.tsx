import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Switch.scss';

const Switch: React.FunctionComponent<SwitchProps> = (props) => {
  const [open, setOpen] = useState();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClick = (): void => {
    props.onToggle(!open);
    setOpen(!open);
  };

  return (
    <div
      id={props.id}
      className={classNames({
        'ed-switch': true,
        open,
        disabled: props.disabled,
      })}
      onClick={() => {
        if (!props.disabled) {
          handleClick();
        }
      }}
    />
  );
};

export interface SwitchProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  id?: string;
  disabled?: boolean;
}

export default Switch;
