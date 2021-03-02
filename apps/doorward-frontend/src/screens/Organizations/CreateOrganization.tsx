import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import CreateOrganizationForm from '../../components/Forms/CreateOrganizationForm';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const CreateOrganization: React.FunctionComponent<CreateOrganizationProps> = (props): JSX.Element => {
  const history = useHistory();
  return (
    <Layout
      {...props}
      header={translate('createOrganization')}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
    >
      <CreateOrganizationForm
        onSuccess={() => {
          history.push('/organizations');
        }}
        onCancel={() => {
          history.push('/organizations');
        }}
      />
    </Layout>
  );
};

export interface CreateOrganizationProps extends PageComponent {}

export default CreateOrganization;
