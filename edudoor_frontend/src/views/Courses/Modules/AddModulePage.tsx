import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '../../../types';
import useViewCourse from '../../../hooks/useViewCourse';
import { Module } from '../../../services/models';
import { useRouteMatch } from 'react-router';
import AddModulePageForm from '../../../components/static/Forms/AddModulePageForm';
import useForm from '../../../hooks/useForm';
import WebComponent from '../../../components/ui/WebComponent';
import useRoutes from '../../../hooks/useRoutes';

const AddModulePage: React.FunctionComponent<AddModulePageProps> = props => {
  const [module, setModule] = useState<Module>();
  const [, course] = useViewCourse();
  const match: any = useRouteMatch();
  const form = useForm();
  const routes = useRoutes();

  useEffect(() => {
    if (course.data.course) {
      setModule(course.data.course.modules.find(module => module.id === +match.params.courseId));
    }
  }, [course.data.course]);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} noNavBar header={module?.title}>
      <WebComponent data={module} loading={!module}>
        {(module): JSX.Element => {
          return (
            <AddModulePageForm
              useForm={form}
              module={module}
              onSuccess={(): void => routes.navigate(routes.routes.viewCourse)}
            />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AddModulePageProps extends PageComponent {}

export default AddModulePage;
