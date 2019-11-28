import React, { FunctionComponent, useEffect } from 'react';
import { PageComponent } from '../../../types';
import Layout, { LayoutFeatures } from '../../Layout';
import usePageResource from '../../../hooks/usePageResource';
import { fetchCourseModuleAction } from '../../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '../../../components/ui/WebComponent';
import QuizDetailsForm from '../../../components/static/Forms/QuizForms/QuizDetailsForm';
import TabLayout from '../../../components/ui/TabLayout';
import Tab from '../../../components/ui/TabLayout/Tab';
import Header from '../../../components/ui/Header';

const CreateQuiz: FunctionComponent<CreateQuizProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.courses.viewModule);
  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('moduleId', fetchCourseModuleAction);

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
      <TabLayout>
        <Tab title="Details">
          <WebComponent data={module} loading={state.fetching} errors={state.errors}>
            {module => <QuizDetailsForm onSuccess={finish} onCancel={finish} module={module} />}
          </WebComponent>
        </Tab>
        <Tab title="Questions">
          <Header size={3}>Questions</Header>
        </Tab>
      </TabLayout>
    </Layout>
  );
};

export interface CreateQuizProps extends PageComponent {}

export default CreateQuiz;
