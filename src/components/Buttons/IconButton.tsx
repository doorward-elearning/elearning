import React from 'react';
import Button, { ButtonProps } from './Button';

const IconButton: React.FunctionComponent<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <Button {...props} icon={icon}>
      <i className="material-icons">{icon}</i>
    </Button>
  );
};

export interface IconButtonProps extends ButtonProps {
}

export default IconButton;
