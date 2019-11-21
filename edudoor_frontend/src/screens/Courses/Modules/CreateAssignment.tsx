import React, { FunctionComponent } from 'react';
import { PageComponent } from '../../../types';
import Layout, { LayoutFeatures } from '../../Layout';
import CreateAssignmentForm from '../../../components/static/Forms/CreateAssignmentForm';
import useForm from '../../../hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';
import WebComponent from '../../../components/ui/WebComponent';
import usePageResource from '../../../hooks/usePageResource';
import { fetchCourseModuleAction } from '../../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import Tools from '../../../utils/Tools';
import useViewCourse from '../../../hooks/useViewCourse';

const CreateAssignment: FunctionComponent<CreateAssignmentProps> = (props): JSX.Element => {
  const form = useForm();
  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('moduleId', fetchCourseModuleAction);
  const finish = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  };
  const state = useSelector((state: State) => state.courses.viewModule);
  const module = state.data.module;
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      noNavBar
      header={Tools.str(module?.title)}
    >
      <WebComponent data={module} loading={state.fetching}>
        {data => <CreateAssignmentForm onSuccess={finish} onCancel={finish} form={form} module={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateAssignmentProps extends PageComponent {}

export default CreateAssignment;
