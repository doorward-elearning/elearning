import React, { useState } from 'react';
import classNames from 'classnames';
import './Switch.scss';

const Switch: React.FunctionComponent<SwitchProps> = props => {
  const [open, setOpen] = useState(props.open);

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
      })}
      onClick={handleClick}
    />
  );
};

export interface SwitchProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  id?: string;
}

export default Switch;
