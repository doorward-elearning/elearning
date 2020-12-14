import React from 'react';
import Modal from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import ChangePasswordForm, { ChangePasswordFormState } from '../../Forms/ChangePasswordForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import PasswordPolicy from '../../UI/PasswordPolicy';
import translate from '@doorward/common/lang/translate';

const ChangePasswordModal: React.FunctionComponent<ChangePasswordModalProps> = (props) => {
  return (
    <Modal useModal={props.useModal}>
      <Modal.Header title={translate('changePassword')} />
      <Modal.Body>
        <PasswordPolicy />
        <ChangePasswordForm
          form={props.useForm}
          onCancel={props.useModal.closeModal}
          onSuccess={() => props.useModal.closeModal(true)}
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
