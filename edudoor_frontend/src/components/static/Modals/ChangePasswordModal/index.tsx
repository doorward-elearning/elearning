import React from 'react';
import Modal from '../../../ui/Modal';
import { UseModal } from '../../../../hooks/useModal';
import ChangePasswordForm, { ChangePasswordFormState } from '../../Forms/ChangePasswordForm';
import { UseForm } from '../../../../hooks/useForm';

const ChangePasswordModal: React.FunctionComponent<ChangePasswordModalProps> = props => {
  return (
    <Modal useModal={props.useModal}>
      <Modal.Header title="Change Password" />
      <Modal.Body>
        <ChangePasswordForm form={props.useForm} onSuccess={props.useModal.closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export interface ChangePasswordModalProps {
  useModal: UseModal;
  useForm: UseForm<ChangePasswordFormState>;
}

export default ChangePasswordModal;
