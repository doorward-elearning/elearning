import React from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import NotFound from '@edudoor/ui/components/NotFound';
import Error404 from '../ErrorPages/Error404';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  return <Error404 {...props} />;
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;
