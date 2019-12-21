import React, { FunctionComponent } from 'react';
import Button, { ButtonProps } from './Button';
import ConfirmModal from '../ConfirmModal';

const ConfirmationButton: FunctionComponent<ConfirmationButtonProps> = ({ children, ...props }): JSX.Element => {
  return (
    <ConfirmModal onConfirm={props.onConfirm} onReject={props.onReject}>
      {onClick => (
        <Button {...props} onClick={onClick}>
          {props.text}
        </Button>
      )}
      <p>{children}</p>
    </ConfirmModal>
  );
};

export interface ConfirmationButtonProps extends ButtonProps {
  onConfirm: () => void;
  onReject?: () => void;
  text: string;
}

export default ConfirmationButton;
