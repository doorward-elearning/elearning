import React, { FunctionComponent } from 'react';
import Button, { ButtonProps } from './Button';
import ConfirmModal from '../ConfirmModal';
import useModal from '@edudoor/frontend/src/hooks/useModal';

const ConfirmationButton: FunctionComponent<ConfirmationButtonProps> = ({ children, ...props }): JSX.Element => {
  const modal = useModal();
  return (
    <ConfirmModal title={props.title} onConfirm={props.onConfirm} onReject={props.onReject} useModal={modal}>
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
  title?: string;
}

export default ConfirmationButton;
