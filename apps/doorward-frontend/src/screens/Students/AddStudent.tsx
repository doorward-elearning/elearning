import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddStudentForm, { AddStudentFormState } from '../../components/Forms/AddStudentForm';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../services/apis/doorward.api';

const AddStudent: React.FunctionComponent<AddStudentProps> = (props) => {
  const studentForm = useForm<AddStudentFormState>();
  const routes = useRoutes();
  const [, newStudentState] = useApiAction(DoorwardApi, (api) => api.students.createStudent);
  const submitted = useFormSubmit(newStudentState);

  return (
    <IfElse condition={submitted}>
      <Redirect to={routes.routes.studentList.link} />
      <Layout
        {...props}
        header={translate('addStudent')}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm
          onCancel={() => routes.navigate(routes.routes.studentList)}
          useForm={studentForm}
          state={newStudentState}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddStudent;
