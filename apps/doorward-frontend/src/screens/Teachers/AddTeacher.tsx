import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { Redirect } from 'react-router';
import AddTeacherForm from '../../components/Forms/AddTeacherForm';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../services/apis/doorward.api';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const AddTeacher: React.FunctionComponent<AddStudentProps> = (props) => {
  const teacherForm = useForm();
  const [, teacherAccountState] = useApiAction(DoorwardApi, (api) => api.teachers.createTeacherAccount);
  const submitted = useFormSubmit(teacherAccountState);
  const navigation = useNavigation();

  return (
    <IfElse condition={submitted}>
      <Redirect to="/teachers" />
      <Layout
        {...props}
        header={translate('addTeacher')}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddTeacherForm
          onCancel={() => navigation.navigate(ROUTES.teachers.list)}
          useForm={teacherForm}
          state={teacherAccountState}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddTeacher;
