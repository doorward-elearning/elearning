import React from 'react';
import BasicForm, { BasicFormFeatures } from '../../../../../edudoor-frontend/src/components/Forms/BasicForm';
import TextField from '@edudoor/ui/components/Input/TextField';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@edudoor/ui/hooks/useForm';
import { initiateFreeTrial } from '../../../reducers/freeTrial/actions';
import validation from './validation';
import { School } from '@edudoor/common/models/School';

const FreeTrialForm: React.FunctionComponent<FreeTrialFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.freeTrial.freeTrial);
  const form = useForm();

  return (
    <BasicForm
      state={state}
      onSuccess={() => props.onSuccess(state.data?.school)}
      features={[BasicFormFeatures.SAVE_BUTTON]}
      positiveText="Try Edudoor"
      form={form}
      enableSubmitButton
      initialValues={{ name: '', email: '', phoneNumber: '' }}
      submitAction={initiateFreeTrial}
      validationSchema={validation}
    >
      <TextField name="name" placeholder="Your School's Name" labelPosition="none" />
      <TextField name="email" placeholder="Email" labelPosition="none" />
      <TextField name="phoneNumber" placeholder="Phone Number" labelPosition="none" />
    </BasicForm>
  );
};

export interface FreeTrialFormProps {
  onSuccess: (school: School) => void;
}

export default FreeTrialForm;
