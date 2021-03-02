import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { Redirect, useHistory } from 'react-router';
import AddTeacherForm from '../../components/Forms/AddTeacherForm';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../services/apis/doorward.api';

const AddTeacher: React.FunctionComponent<AddStudentProps> = (props) => {
  const teacherForm = useForm();
  const [, teacherAccountState] = useApiAction(DoorwardApi, (api) => api.teachers.createTeacherAccount);
  const submitted = useFormSubmit(teacherAccountState);
  const history = useHistory();

  return (
    <IfElse condition={submitted}>
      <Redirect to="/teachers" />
      <Layout
        {...props}
        header={translate('addTeacher')}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddTeacherForm onCancel={() => history.push('/teachers')} useForm={teacherForm} state={teacherAccountState} />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddTeacher;
