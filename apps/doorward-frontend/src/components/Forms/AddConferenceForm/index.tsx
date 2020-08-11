import React from 'react';
import './AddConferenceForm.scss';
import { UseForm } from '@doorward/ui/hooks/useForm';
import TextField from '@doorward/ui/components/Input/TextField';
import { CreateConferenceBody } from '../../../services/models/requestBody';
import { OnFormSubmit } from '@doorward/ui/types';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Header from '@doorward/ui/components/Header';
import Form from '@doorward/ui/components/Form';
import addConferenceForm from './validation';
import TextArea from '@doorward/ui/components/Input/TextArea';

const AddConferenceForm: React.FunctionComponent<AddConferenceFormProps> = props => {
  const initialValues = {
    title: '',
    description: '',
  };

  return (
    <Form
      showOverlay
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      formClassName="add-conference-form"
      validationSchema={addConferenceForm}
      form={props.useForm}
    >
      {(formikProps): JSX.Element => (
        <React.Fragment>
          <div className="conference-information">
            <Header size={2}>Conference Information</Header>
            <TextField name="title" icon="meeting_room" label="Conference name" />
            <TextArea name="description" icon="info" label="Description" />
          </div>
        </React.Fragment>
      )}
    </Form>
  );
};

export interface AddConferenceFormProps {
  onSubmit: OnFormSubmit<AddConferenceFormState>;
  useModal: UseModal;
  title: string;
  useForm: UseForm<AddConferenceFormState>;
}

export interface AddConferenceFormState extends CreateConferenceBody {}

export default AddConferenceForm;
