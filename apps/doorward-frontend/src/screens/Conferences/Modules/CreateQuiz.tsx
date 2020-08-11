import React, { FunctionComponent, useCallback, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { fetchConferenceModuleAction } from '../../../reducers/conferences/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useViewConference from '../../../hooks/useViewConference';
import useRoutes from '../../../hooks/useRoutes';
import CreateQuizForm from '../../../components/Forms/QuizForms/CreateQuizForm';
import WebComponent from '@doorward/ui/components/WebComponent';
import usePageResource from '../../../hooks/usePageResource';
import { PageComponent } from '@doorward/ui/types';

const CreateQuiz: FunctionComponent<CreateQuizProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.conferences.viewModule);
  const routes = useRoutes();
  const [conferenceId] = useViewConference();
  usePageResource('moduleId', fetchConferenceModuleAction);

  const { module } = state.data;
  useEffect(() => {
    if (module) {
      routes.setCurrentTitle(module.title);
    }
  }, [module]);

  const finish = useCallback(() => {
    routes.navigate(routes.viewConference, {
      conferenceId,
    });
  }, []);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Create Quiz" noNavBar>
      <WebComponent data={module} loading={state.fetching} errors={state.errors}>
        {module => <CreateQuizForm onSuccess={finish} onCancel={finish} module={module} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateQuizProps extends PageComponent {}

export default CreateQuiz;
