import React from 'react';
import AddConferenceForm, { AddConferenceFormState } from '../../Forms/AddConferenceForm';
import { useHistory } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import { ROUTES } from '../../../routes/routes';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { OnFormSubmit } from '@doorward/ui/types';

const AddConferenceModal: React.FunctionComponent<AddConferenceModalProps> = props => {
  const form = useForm<AddConferenceFormState>();
  const { formikProps } = form;
  const history = useHistory();

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
    history.push(ROUTES.conferenceList.link);
  });
  return (
    <Modal {...props}>
      <Modal.Header title={props.title} />
      <Modal.Body>
        <AddConferenceForm onSubmit={props.onSubmit} useModal={props.useModal} title={props.title} useForm={form} />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save' }}
        onPositiveClick={formikProps && formikProps.submitForm}
        props={{
          positive: {
            loading: props.loading,
            disabled: !(formikProps && formikProps.isValid),
            type: 'submit',
          },
        }}
      />
    </Modal>
  );
};

export interface AddConferenceModalProps extends ModalProps {
  onSubmit: OnFormSubmit<AddConferenceFormState>;
  title: string;
  loading?: boolean;
}

export default AddConferenceModal;
