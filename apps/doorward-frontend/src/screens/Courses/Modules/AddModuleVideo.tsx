import React, { useEffect, useState } from 'react';
import ModuleEntity from '@doorward/common/entities/module.entity';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import useRoutes from '../../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import AddModuleVideoForm from '../../../components/Forms/AddModuleVideoForm';

const AddModuleVideo: React.FunctionComponent<AddModuleVideoProps> = (props): JSX.Element => {
  const [module, setModule] = useState<ModuleEntity>();
  const [courseId, course] = useViewCourse();
  const match: any = useRouteMatch();
  const form = useForm();
  const routes = useRoutes();

  useEffect(() => {
    if (course.data?.course) {
      setModule(course.data?.course.modules.find((module) => module.id === match.params.moduleId));
    }
  }, [course.data?.course]);

  const finish = () => {
    routes.navigate(routes.routes.viewCourse, {
      courseId: courseId,
    });
  };

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} noNavBar header={module?.title}>
      <WebComponent data={module} loading={!module}>
        {(module): JSX.Element => {
          return <AddModuleVideoForm useForm={form} module={module} onCancel={finish} onSuccess={finish} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AddModuleVideoProps extends PageComponent {}

export default AddModuleVideo;
