import React from 'react';
import { useHistory } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import { ROUTES } from '../../../routes/routes';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { OnFormSubmit } from '@doorward/ui/types';
import CreateElectionForm, { CreateElectionFormState } from '../../Forms/CreateElectionForm';

const CreateElectionModal: React.FunctionComponent<CreateElectionModalProps> = props => {
  const form = useForm<CreateElectionFormState>();
  const { formikProps } = form;
  const history = useHistory();

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
    history.push(ROUTES.electionList.link);
  });

  return (
    <Modal {...props}>
      <Modal.Header title="Create Election" />
      <Modal.Body>
        <CreateElectionForm useForm={form} />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save', negative: 'Close' }}
        onPositiveClick={formikProps && formikProps.submitForm}
        onNegativeClick={props.useModal.closeModal}
        props={{
          positive: {
            loading: props.loading,
            disabled: !(formikProps && formikProps.isValid),
            type: 'submit',
          },
          negative: {
            type: 'button',
          },
        }}
      />
    </Modal>
  );
};

export interface CreateElectionModalProps extends ModalProps {
  onSubmit: OnFormSubmit<CreateElectionFormState>;
  loading?: boolean;
}

export default CreateElectionModal;
