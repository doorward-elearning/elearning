import React, { useEffect } from 'react';
import CreatePollForm, { AddModuleFormState } from '../../Forms/CreatePollForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Header from '@doorward/ui/components/Header';

const AddConferencePollModal: React.FunctionComponent<AddConferencePollModalProps> = props => {
  const form = useForm<AddModuleFormState>();
  const { formikProps } = form;

  const state = useSelector((state: State) => state.conferences.createModule);

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
        <Header size={2}>Create a poll</Header>
      </Modal.Header>
      <Modal.Body>
        {props.conferenceId && <CreatePollForm conferenceId={props.conferenceId} useForm={form} />}
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save' }}
        props={{
          positive: {
            disabled: !formikProps?.isValid,
            loading: state.submitting,
          },
        }}
        onPositiveClick={formikProps && formikProps.submitForm}
      />
    </Modal>
  );
};

export interface AddConferencePollModalProps extends ModalProps {
  conferenceId: string;
  useModal: UseModal;
}

export default AddConferencePollModal;
