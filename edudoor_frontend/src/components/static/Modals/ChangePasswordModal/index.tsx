import React from 'react';
import Modal from '../../../ui/Modal';
import { UseModal } from '../../../../hooks/useModal';
import ChangePasswordForm, { ChangePasswordFormState } from '../../Forms/ChangePasswordForm';
import { UseForm } from '../../../../hooks/useForm';
import PasswordPolicy from '../../UI/PasswordPolicy';

const ChangePasswordModal: React.FunctionComponent<ChangePasswordModalProps> = props => {
  return (
    <Modal useModal={props.useModal}>
      <Modal.Header title="Change Password" />
      <Modal.Body>
        <PasswordPolicy />
        <ChangePasswordForm
          form={props.useForm}
          onCancel={props.useModal.closeModal}
          onSuccess={props.useModal.closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export interface ChangePasswordModalProps {
  useModal: UseModal;
  useForm: UseForm<ChangePasswordFormState>;
}

export default ChangePasswordModal;
