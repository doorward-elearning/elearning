import React, { useEffect } from 'react';
import AddModuleForm, { AddModuleFormState } from '../../Forms/AddModuleForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Header from '@doorward/ui/components/Header';

const AddForumModuleModal: React.FunctionComponent<AddForumModuleModalProps> = props => {
  const form = useForm<AddModuleFormState>();
  const { formikProps } = form;

  const state = useSelector((state: State) => state.forums.createModule);

  useEffect(() => {
    if (state.data.module) {
      props.useModal.closeModal();
    }
  }, [state.data]);

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
  });
  return (
    <Modal {...props}>
      <Modal.Header>
        <Header size={2}>Add Forum Module</Header>
      </Modal.Header>
      <Modal.Body>
        <AddModuleForm forumId={props.forumId} useForm={form} />
      </Modal.Body>
      <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps && formikProps.submitForm} />
    </Modal>
  );
};

export interface AddForumModuleModalProps extends ModalProps {
  forumId: string;
  useModal: UseModal;
}

export default AddForumModuleModal;
