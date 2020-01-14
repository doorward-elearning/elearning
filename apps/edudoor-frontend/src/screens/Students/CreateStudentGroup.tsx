import React from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import AddGroupForm from '../../components/Forms/AddGroupForm';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS]}>
      <AddGroupForm />
    </Layout>
  );
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;
