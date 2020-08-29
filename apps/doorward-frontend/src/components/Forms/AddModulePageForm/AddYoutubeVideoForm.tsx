import React from 'react';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Form from '@doorward/ui/components/Form';
import { UseForm } from '@doorward/ui/hooks/useForm';
import addYoutubeVideoForm from './addYoutubeVideoForm';

const AddYoutubeVideoForm: React.FunctionComponent<AddYoutubeVideoFormProps> = (props): JSX.Element => {
  const { addYoutubeVideoModal, form } = props;
  const initialState = {
    video: '',
  };

  return (
    <Form
      form={form}
      initialValues={initialState}
      onSubmit={(values) => {
        props.onSubmit(values.video);
      }}
      validationSchema={addYoutubeVideoForm}
    >
      {(formikProps) => (
        <Modal
          useModal={addYoutubeVideoModal}
          features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON]}
          cancellable
        >
          <Modal.Header>Add Youtube Video</Modal.Header>
          <Modal.Body>
            <TextField name="video" label="Video Link" icon="link" />
          </Modal.Body>
          <Modal.Footer
            onNegativeClick={() => {
              addYoutubeVideoModal.closeModal();
            }}
            onPositiveClick={() => {
              formikProps.submitForm();
              addYoutubeVideoModal.closeModal();
            }}
            props={{ positive: { disabled: !formikProps.isValid } }}
          />
        </Modal>
      )}
    </Form>
  );
};

export interface AddYoutubeVideoFormState {
  video: string;
}

export interface AddYoutubeVideoFormProps {
  addYoutubeVideoModal: UseModal;
  form: UseForm<AddYoutubeVideoFormState>;
  onSubmit: (video: string) => void;
}

export default AddYoutubeVideoForm;
