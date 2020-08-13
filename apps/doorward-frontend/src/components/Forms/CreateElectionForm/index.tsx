import React from 'react';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import addModuleForm from './validation';
import useAction from '@doorward/ui/hooks/useActions';
import { CreateElectionBody } from '../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import './CreateElectionForm.scss';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DateInput from '@doorward/ui/components/Input/DateInput';
import moment from 'moment';
import { createElectionAction } from '../../../reducers/elections/actions';

const CreateElectionForm: React.FunctionComponent<CreateElectionFormProps> = props => {
  const initialValues = {
    title: '',
    startDate: new Date(),
    endDate: moment()
      .add(1, 'day')
      .toDate(),
  };
  const state = useSelector((state: State) => state.elections.createElection);

  const createElection = useAction(createElectionAction);

  const onSubmit = (values: CreateElectionFormState): void => {
    createElection(values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      showOverlay
      formClassName="ed-create-election-form"
      validationSchema={addModuleForm}
      state={state}
      form={props.useForm}
    >
      {formikProps => {
        return (
          <React.Fragment>
            <TextField name="title" label="Title" icon="poll" />
            <DateInput minDate={new Date()} showTimeInput name="startDate" label="Start Date" />
            <DateInput minDate={formikProps.values.startDate} showTimeInput name="endDate" label="End Date" />
          </React.Fragment>
        );
      }}
    </Form>
  );
};

export interface CreateElectionFormState extends CreateElectionBody {}

export interface CreateElectionFormProps {
  useForm: UseForm<CreateElectionFormState>;
}
export default CreateElectionForm;
