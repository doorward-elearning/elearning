import React from 'react';
import BasicForm from '../BasicForm';
import { createOrganization, updateOrganization } from '../../../reducers/organizations/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@edudoor/ui/hooks/useForm';
import TextField from '@edudoor/ui/components/Input/TextField';
import TextArea from '@edudoor/ui/components/Input/TextArea';
import validation from './validation';
import EImage from '@edudoor/ui/components/Image';
import Header from '@edudoor/ui/components/Header';
import IfElse from '@edudoor/ui/components/IfElse';
import { Organization } from '@edudoor/common/models/Organization';

const CreateOrganizationForm: React.FunctionComponent<CreateOrganizationFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.organizations.create);
  const form = useForm();
  const initialValues = {
    name: '',
    icon: '',
    description: '',
    ...(props.organization || {}),
  };
  return (
    <BasicForm
      submitAction={props.organization ? updateOrganization : createOrganization}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      positiveText={props.organization ? 'Edit' : 'Save'}
      validationSchema={validation}
      state={state}
      form={form}
      createData={values => {
        return props.organization ? [props.organization.id, values] : [values];
      }}
      showSuccessToast
      showOverlay
    >
      {formikProps => (
        <React.Fragment>
          <TextField name="name" label="Name" />
          <TextField name="icon" label="Icon" placeholder="https://" />
          <IfElse condition={formikProps.values.icon && !formikProps.errors.icon}>
            <div>
              <Header size={4}>Icon Preview</Header>
              <EImage size="medium" src={formikProps.values.icon} />
            </div>
          </IfElse>
          <TextArea name="description" label="Description" />
        </React.Fragment>
      )}
    </BasicForm>
  );
};

export interface CreateOrganizationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  organization?: Organization;
}

export default CreateOrganizationForm;
