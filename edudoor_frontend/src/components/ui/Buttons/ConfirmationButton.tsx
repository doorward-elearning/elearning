import React, { FunctionComponent } from 'react';
import Button, { ButtonProps } from './Button';
import useModal from '../../../hooks/useModal';
import Modal, { ModalFeatures } from '../Modal';

const ConfirmationButton: FunctionComponent<ConfirmationButtonProps> = ({ children, ...props }): JSX.Element => {
  const modal = useModal(false);
  return (
    <React.Fragment>
      <Button {...props} onClick={modal.openModal}>
        {props.text}
      </Button>
      <Modal useModal={modal} features={[ModalFeatures.NEGATIVE_BUTTON, ModalFeatures.POSITIVE_BUTTON]}>
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer
          onPositiveClick={() => {
            modal.closeModal();
            props.onConfirm();
          }}
          onNegativeClick={() => {
            modal.closeModal();
            props.onReject && props.onReject();
          }}
        />
      </Modal>
    </React.Fragment>
  );
};

export interface ConfirmationButtonProps extends ButtonProps {
  onConfirm: () => void;
  onReject?: () => void;
  text: string;
}

export default ConfirmationButton;
