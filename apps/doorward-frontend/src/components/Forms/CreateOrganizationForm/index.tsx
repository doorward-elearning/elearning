import React from 'react';
import BasicForm from '../BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import TextField from '@doorward/ui/components/Input/TextField';
import TextArea from '@doorward/ui/components/Input/TextArea';
import EImage from '@doorward/ui/components/Image';
import Header from '@doorward/ui/components/Header';
import IfElse from '@doorward/ui/components/IfElse';
import DoorwardApi from '../../../services/apis/doorward.api';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { CreateOrganizationBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const CreateOrganizationForm: React.FunctionComponent<CreateOrganizationFormProps> = (props): JSX.Element => {
  const form = useForm();
  const initialValues = {
    name: '',
    icon: '',
    description: '',
    ...(props.organization || {}),
  };

  const apiAction = useApiAction(DoorwardApi, (api) =>
    props.organization ? api.organizations.createOrganization : api.organizations.updateOrganization
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
          <TextField name="icon" label={translate('icon')} placeholder="https://" />
          <IfElse condition={formikProps.values.icon && !formikProps.errors.icon}>
            <div>
              <Header size={4}>{translate('iconPreview')}</Header>
              <EImage size="medium" src={formikProps.values.icon} />
            </div>
          </IfElse>
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
