import React, { useEffect, useState } from 'react';
import { Module } from '../../../services/models';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '../../../components/ui/WebComponent';
import { PageComponent } from '../../../types';
import useRoutes from '../../../hooks/useRoutes';
import Tools from '../../../utils/Tools';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = props => {
  const [module, setModule] = useState<Module>();
  const [, course] = useViewCourse();
  const match: any = useRouteMatch();
  const routes = useRoutes();

  useEffect(() => {
    if (course.data.course) {
      const currentModule = course.data.course.modules.find(module => module.id === match.params.moduleId);
      if (currentModule) {
        setModule(currentModule);
        routes.setTitle(routes.viewModuleItem.id, currentModule.title);
      }
    }
  }, [course.data.course]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      noNavBar
      header={Tools.str(module?.title)}
    >
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
