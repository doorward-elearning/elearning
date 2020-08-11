import React from 'react';
import AddForumForm, { AddForumFormState } from '../../Forms/AddForumForm';
import { useHistory } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import { ROUTES } from '../../../routes/routes';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { OnFormSubmit } from '@doorward/ui/types';

const AddForumModal: React.FunctionComponent<AddForumModalProps> = props => {
  const form = useForm<AddForumFormState>();
  const { formikProps } = form;
  const history = useHistory();

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
    history.push(ROUTES.forumList.link);
  });
  return (
    <Modal {...props}>
      <Modal.Header title={props.title} />
      <Modal.Body>
        <AddForumForm
          onSubmit={props.onSubmit}
          useModal={props.useModal}
          title={props.title}
          useForm={form}
        />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save' }}
        onPositiveClick={formikProps && formikProps.submitForm}
        props={{
          positive: {
            disabled: !(formikProps && formikProps.isValid),
            type: 'submit'
          }
        }}
      />
    </Modal>
  );
};

export interface AddForumModalProps extends ModalProps {
  onSubmit: OnFormSubmit<AddForumFormState>;
  title: string;
}

export default AddForumModal;
