import React, { FunctionComponent, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import useRoutes from '../../../hooks/useRoutes';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useViewCourse from '../../../hooks/useViewCourse';
import WebComponent from '@doorward/ui/components/WebComponent';
import useForm from '@doorward/ui/hooks/useForm';
import usePageResource from '../../../hooks/usePageResource';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import translate from '@doorward/common/lang/translate';

const CreateAssignment: FunctionComponent<CreateAssignmentProps> = (props): JSX.Element => {
  const form = useForm();
  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('moduleId', DoorwardApi.modules.getModule);
  const finish = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  };
  const state = useDoorwardApi((state) => state.modules.getModule);
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
      header={translate('createAssignment')}
    >
      <WebComponent data={module} loading={state.fetching}>
        {(data) => <CreateAssignmentForm onSuccess={finish} onCancel={finish} form={form} module={data} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateAssignmentProps extends PageComponent {}

export default CreateAssignment;
