import React, { FunctionComponent, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import useRoutes from '../../../hooks/useRoutes';
import { fetchForumModuleAction } from '../../../reducers/forums/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useViewForum from '../../../hooks/useViewForum';
import WebComponent from '@doorward/ui/components/WebComponent';
import useForm from '@doorward/ui/hooks/useForm';
import usePageResource from '../../../hooks/usePageResource';
import { PageComponent } from '@doorward/ui/types';

const CreateAssignment: FunctionComponent<CreateAssignmentProps> = (props): JSX.Element => {
  const form = useForm();
  const routes = useRoutes();
  const [forumId] = useViewForum();
  usePageResource('moduleId', fetchForumModuleAction);
  const finish = () => {
    routes.navigate(routes.viewForum, {
      forumId,
    });
  };
  const state = useSelector((state: State) => state.forums.viewModule);
  const module = state.data.module;
  useEffect(() => {
    if (module && routes.currentRoute) {
      routes.setTitle(routes.currentRoute, module.title);
    }
  }, [module]);
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      noNavBar
      header="Create Assignment"
    >
      <WebComponent data={module} loading={state.fetching}>
        {data => <CreateAssignmentForm onSuccess={finish} onCancel={finish} form={form} module={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateAssignmentProps extends PageComponent {}

export default CreateAssignment;
