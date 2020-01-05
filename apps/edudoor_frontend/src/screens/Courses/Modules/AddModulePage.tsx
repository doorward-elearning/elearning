import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '@edudoor/ui/src/types';
import useViewCourse from '../../../hooks/useViewCourse';
import { Module } from '../../../../../../libs/shared/models';
import { useRouteMatch } from 'react-router';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import useForm from '@edudoor/ui/src/hooks/useForm';
import WebComponent from '@edudoor/ui/src/components/WebComponent';
import useRoutes from '../../../hooks/useRoutes';

const AddModulePage: React.FunctionComponent<AddModulePageProps> = props => {
  const [module, setModule] = useState<Module>();
  const [courseId, course] = useViewCourse();
  const match: any = useRouteMatch();
  const form = useForm();
  const routes = useRoutes();

  useEffect(() => {
    if (course.data.course) {
      setModule(course.data.course.modules.find(module => module.id === match.params.moduleId));
    }
  }, [course.data.course]);

  const finish = () => {
    routes.navigate(routes.routes.viewCourse, {
      courseId: courseId,
    });
  };

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} noNavBar header={module?.title}>
      <WebComponent data={module} loading={!module}>
        {(module): JSX.Element => {
          return <AddModulePageForm useForm={form} module={module} onCancel={finish} onSuccess={finish} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AddModulePageProps extends PageComponent {}

export default AddModulePage;
