import React, { useEffect, useState } from 'react';
import { Module } from '../../../services/models';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '../../../components/ui/WebComponent';
import { PageComponent } from '../../../types';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = props => {
  const [module, setModule] = useState<Module>();
  const [, course] = useViewCourse();
  const match: any = useRouteMatch();

  useEffect(() => {
    if (course.data.course) {
      setModule(course.data.course.modules.find(module => module.id === match.params.moduleId));
    }
  }, [course.data.course]);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} noNavBar header={module?.title}>
      <WebComponent data={module} loading={!module}>
        {(module): JSX.Element => {
          return <div></div>;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewModulePageProps extends PageComponent {}

export default ViewModuleItem;
