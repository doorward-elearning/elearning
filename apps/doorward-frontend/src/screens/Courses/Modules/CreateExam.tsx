import React, { FunctionComponent, useCallback, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';
import CreateQuizForm from '../../../components/Forms/QuizForms/CreateQuizForm';
import WebComponent from '@doorward/ui/components/WebComponent';
import usePageResource from '../../../hooks/usePageResource';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';

const CreateExam: FunctionComponent<CreateExamProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.modules.getModule);
  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('moduleId', DoorwardApi.modules.getModule);

  const { module } = state.data;
  useEffect(() => {
    if (module) {
      routes.setCurrentTitle(module.title);
    }
  }, [module]);

  const finish = useCallback(() => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  }, []);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Create Exam" noNavBar>
      <WebComponent data={module} loading={state.fetching} errors={state.errors}>
        {(module) => <CreateQuizForm onSuccess={finish} onCancel={finish} module={module} exam />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateExamProps extends PageComponent {}

export default CreateExam;
