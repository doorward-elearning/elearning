import React, { useEffect, useState } from 'react';
import { Module, ModuleItem } from '../../../services/models';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '../../../components/ui/WebComponent';
import { PageComponent } from '../../../types';
import useRoutes from '../../../hooks/useRoutes';
import Tools from '../../../utils/Tools';
import IfElse from '../../../components/ui/IfElse';
import DraftHTMLContent from '../../../components/ui/DraftHTMLContent';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = props => {
  const [item, setItem] = useState<ModuleItem>();
  const [, course] = useViewCourse();
  const match: any = useRouteMatch();
  const routes = useRoutes();

  useEffect(() => {
    if (course.data.course) {
      const currentModule = course.data.course.modules.find(module => module.id === match.params.moduleId);
      if (currentModule) {
        const moduleItem = currentModule.items.find(item => {
          return item.id === match.params.itemId;
        });
        setItem(moduleItem);
        routes.setTitle(routes.viewModuleItem.id, currentModule.title);
      }
    }
  }, [course.data.course]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      noNavBar
      header={Tools.str(item?.title)}
    >
      <WebComponent data={item} loading={course.fetching}>
        {(item): JSX.Element => {
          return (
            <IfElse condition={item.type === 'Page'}>
              <DraftHTMLContent content={item.content} />
            </IfElse>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewModulePageProps extends PageComponent {}

export default ViewModuleItem;
