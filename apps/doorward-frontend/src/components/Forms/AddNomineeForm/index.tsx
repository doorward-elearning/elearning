import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import ProfilePicture from '@doorward/ui/components/Input/ProfilePicture';
import addNomineeForm from './addNomineeForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import './AddNomineeForm.scss';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { addNomineeAction } from 'apps/doorward-frontend/src/reducers/elections/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';

const AddNomineeForm: React.FunctionComponent<AddNomineeFormProps> = (props): JSX.Element => {
  const { createNominee } = useSelector((state: State) => state.elections);
  const initialValues = {
    profilePicture: '',
    profile: null,
    name: '',
  };
  return (
    <BasicForm
      showOverlay
      initialValues={initialValues}
      showSuccessToast
      showErrorToast
      formClassName="add-nominee-form"
      features={[BasicFormFeatures.SAVE_BUTTON, BasicFormFeatures.CANCEL_BUTTON]}
      onSuccess={props.onSuccess}
      submitAction={addNomineeAction}
      createData={values => [props.electionId, { ...values, profile: JSON.stringify(values.profile) }]}
      state={createNominee}
      validationSchema={addNomineeForm}
      form={props.useForm}
    >
      {(formikProps): JSX.Element => (
        <React.Fragment>
          <div className="form-fields">
            <ProfilePicture name="profilePicture" label="Profile Picture" />
            <div>
              <TextField name="name" label="Full name" />
              <DraftTextArea name="profile" className="fluid" label="Profile" />
            </div>
          </div>
        </React.Fragment>
      )}
    </BasicForm>
  );
};

export interface AddNomineeFormState {
  profilePicture: string;
  profile: object;
  name: string;
}

export interface AddNomineeFormProps {
  useForm: UseForm<AddNomineeFormState>;
  electionId: string;
  onSuccess: () => void;
}

export default AddNomineeForm;
