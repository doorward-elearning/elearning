import React, { FunctionComponent, useCallback, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import usePageResource from '../../../hooks/usePageResource';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import CreateAssessmentForm from '../../../components/Forms/AssessmentForm/CreateAssessmentForm';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const CreateQuiz: FunctionComponent<CreateQuizProps> = (props): JSX.Element => {
  const [getModule, state] = useApiAction(DoorwardApi, (api) => api.modules.getModule);
  const routes = useRoutes();
  const [courseId] = useViewCourse();

  usePageResource('moduleId', getModule);

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
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={translate('createQuiz')}
      noNavBar
    >
      <WebComponent data={module} loading={state.fetching} errors={state.errors}>
        {(module) => (
          <CreateAssessmentForm type={AssessmentTypes.QUIZ} onSuccess={finish} onCancel={finish} module={module} />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface CreateQuizProps extends PageComponent {}

export default CreateQuiz;
