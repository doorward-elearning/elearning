import React from 'react';
import Modal from '@edudoor/ui/src/components/Modal';
import { UseModal } from '@edudoor/ui/src/hooks/useModal';
import ChangePasswordForm, { ChangePasswordFormState } from '../../Forms/ChangePasswordForm';
import { UseForm } from '@edudoor/ui/src/hooks/useForm';
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
