import React from 'react';
import BasicForm from '../BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import TextField from '@doorward/ui/components/Input/TextField';
import TextArea from '@doorward/ui/components/Input/TextArea';
import EImage from '@doorward/ui/components/Image';
import DoorwardApi from '../../../services/apis/doorward.api';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { CreateOrganizationBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { CustomerTypes } from '@doorward/common/types/customerTypes';

const CreateOrganizationForm: React.FunctionComponent<CreateOrganizationFormProps> = (props): JSX.Element => {
  const form = useForm();
  const initialValues = {
    name: '',
    displayName: '',
    logo: '',
    darkThemeLogo: '',
    description: '',
    customerType: CustomerTypes.COLLEGE_INDIA,
    hosts: window.location.host,
    ...(props.organization || {}),
  };

  const apiAction = useApiAction(DoorwardApi, (api) =>
    props.organization ? api.organizations.updateOrganization : api.organizations.createOrganization
  );
  return (
    <BasicForm
      apiAction={apiAction}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      positiveText={props.organization ? translate('save') : translate('add')}
      validationSchema={CreateOrganizationBody}
      form={form}
      createData={(values) => {
        return props.organization ? [props.organization.id, values] : [values];
      }}
      showSuccessToast
      showOverlay
    >
      {(formikProps) => (
        <React.Fragment>
          <TextField name="name" label={translate('name')} />
          <TextField name="displayName" label={translate('orgDisplayName')} />
          <TextField name="logo" label={translate('logo')} />
          {formikProps.values.logo && !formikProps.errors.logo && (
            <EImage size="medium" src={formikProps.values.logo} />
          )}
          <TextField name="darkThemeLogo" label={translate('darkThemeLogoLabel')} />
          {formikProps.values.darkThemeLogo && !formikProps.errors.darkThemeLogo && (
            <EImage size="medium" src={formikProps.values.darkThemeLogo} />
          )}
          <TextField name="hosts" label={translate('hosts')} placeholder="https://" />
          <TextArea name="description" label={translate('description')} />
        </React.Fragment>
      )}
    </BasicForm>
  );
};

export interface CreateOrganizationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  organization?: OrganizationEntity;
}

export default CreateOrganizationForm;
