import React, { FunctionComponent, useEffect } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../../Layout';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import { fetchCourseModuleAction } from '../../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '@edudoor/ui/components/WebComponent';
import CreateQuizForm from '../../../components/Forms/QuizForms/CreateQuizForm';

const CreateQuiz: FunctionComponent<CreateQuizProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.courses.viewModule);
  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('moduleId', fetchCourseModuleAction, routes);

  const { module } = state.data;
  useEffect(() => {
    if (module) {
      routes.setCurrentTitle(module.title);
    }
  }, [module]);

  const finish = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  };

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
