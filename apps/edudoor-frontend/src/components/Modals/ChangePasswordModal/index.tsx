import React from 'react';
import Modal from '@edudoor/ui/components/Modal';
import { UseModal } from '@edudoor/ui/hooks/useModal';
import ChangePasswordForm, { ChangePasswordFormState } from '../../Forms/ChangePasswordForm';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import PasswordPolicy from '../../UI/PasswordPolicy';
import { ActionCreator } from '@edudoor/ui/reducers/reducers';

const ChangePasswordModal: React.FunctionComponent<ChangePasswordModalProps> = props => {
  return (
    <Modal useModal={props.useModal}>
      <Modal.Header title="Change Password" />
      <Modal.Body>
        <PasswordPolicy />
        <ChangePasswordForm
          form={props.useForm}
          onCancel={props.useModal.closeModal}
          submitAction={props.submitAction}
          dontEnterCurrentPassword={props.dontEnterCurrentPassword}
          createData={props.createChangePasswordData}
          onSuccess={() => props.useModal.closeModal(true)}
        />
      </Modal.Body>
    </Modal>
  );
};

export interface ChangePasswordModalProps {
  useModal: UseModal;
  useForm: UseForm<ChangePasswordFormState>;
  submitAction?: ActionCreator;
  dontEnterCurrentPassword?: boolean;
  createChangePasswordData?: (data: ChangePasswordFormState) => Array<any>;
}

export default ChangePasswordModal;
