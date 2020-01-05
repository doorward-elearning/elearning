import React, { FunctionComponent, useEffect } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../../Layout';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import useForm from '@edudoor/ui/hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '@edudoor/ui/components/WebComponent';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import { fetchCourseModuleAction } from '../../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useViewCourse from '../../../hooks/useViewCourse';

const CreateAssignment: FunctionComponent<CreateAssignmentProps> = (props): JSX.Element => {
  const form = useForm();
  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('moduleId', fetchCourseModuleAction, routes);
  const finish = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  };
  const state = useSelector((state: State) => state.courses.viewModule);
  const module = state.data.module;
  useEffect(() => {
    if (module && routes.currentRoute) {
      routes.setTitle(routes.currentRoute, module.title);
    }
  }, [module]);
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} noNavBar header="Create Assignment">
      <WebComponent data={module} loading={state.fetching}>
        {data => <CreateAssignmentForm onSuccess={finish} onCancel={finish} form={form} module={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateAssignmentProps extends PageComponent {}

export default CreateAssignment;
