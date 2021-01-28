import React, { useEffect, useState } from 'react';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import useRoutes from '../../../hooks/useRoutes';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import EditableView from '../../../components/EditableView';
import AssignmentView from '../../../components/UI/AssignmentView';
import ViewPages from './ViewPages';
import WebComponent from '@doorward/ui/components/WebComponent';
import IfElse from '@doorward/ui/components/IfElse';
import Tools from '@doorward/common/utils/Tools';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import DoorwardApi from '../../../services/apis/doorward.api';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';
import CreateAssessmentForm from '../../../components/Forms/AssessmentForm/CreateAssessmentForm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import AssessmentView from '../../../components/UI/AssessmentView';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import translate from '@doorward/common/lang/translate';
import ModulesSideBar from './ModulesSideBar';
import ViewModuleVideo from './ViewModuleVideo';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';
import { useApiAction } from 'use-api-action';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = (props) => {
  const [item, setItem] = useState<ModuleItemEntity>();
  const [module, setModule] = useState<ModuleEntity>();
  const [courseId, course] = useViewCourse();
  const match: any = useRouteMatch();
  const routes = useRoutes();
  const [editing, setEditing] = useState(routes.currentRoute === routes.editModuleItem.id);
  const assignmentForm = useForm();

  const [fetchItem, state] = useApiAction(DoorwardApi, (api) => api.moduleItems.getModuleItem);

  useEffect(() => {
    fetchItem(match.params.itemId);
  }, [match.params.itemId]);

  useEffect(() => {
    setEditing(routes.currentRoute === routes.editModuleItem.id);
  }, [routes.currentRoute]);

  useEffect(() => {
    const moduleItem = state.data?.item;
    if (moduleItem) {
      setItem(moduleItem);
    }
  }, [state]);

  useEffect(() => {
    if (course.data?.course) {
      const currentModule = course.data?.course.modules.find((module) => module.id === match.params.moduleId);
      if (currentModule) {
        setModule(currentModule);
        routes.setTitle(routes.viewModuleItem.id, currentModule.title);
      }
    }
  }, [course.data?.course, match.params.itemId]);

  const goBack = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  };

  const params = {
    courseId,
    moduleId: module?.id,
    itemId: item?.id,
  };

  return (
    <Layout
      {...props}
      features={[
        LayoutFeatures.BREAD_CRUMBS,
        LayoutFeatures.HEADER,
        LayoutFeatures.BACK_BUTTON,
        LayoutFeatures.ACTION_BUTTON,
      ]}
      actionBtnProps={{
        icon: 'edit',
        text: item ? translate('editItem', { item: item.type }) : '',
        theme: 'secondary',
        privileges: ['modules.update'],
        onClick: () => routes.navigate(routes.editModuleItem, params),
        disabled: editing,
      }}
      header={Tools.str(state.fetching ? '' : item?.title)}
      rightContent={<ModulesSideBar course={course?.data?.course} item={item} />}
    >
      <WebComponent data={item} hasData={() => !state.fetching} loading={state.fetching}>
        {(item): JSX.Element => {
          return (
            <React.Fragment>
              {module && (
                <React.Fragment>
                  <IfElse condition={item?.type === ModuleItemType.PAGE}>
                    <ViewPages
                      onEditSuccess={() => setEditing(false)}
                      module={module}
                      editing={editing}
                      params={params}
                      item={item as PageEntity}
                    />
                  </IfElse>
                  <IfElse condition={item.type === ModuleItemType.ASSESSMENT}>
                    <EditableView
                      viewerView={
                        <AssessmentView
                          assessment={item as AssessmentEntity}
                          onCancel={() => routes.navigate(routes.viewCourse, params)}
                        />
                      }
                      creatorView={
                        <CreateAssessmentForm
                          onSuccess={() => routes.navigate(routes.viewModuleItem, params)}
                          onCancel={() => routes.navigate(routes.viewModuleItem, params)}
                          module={module}
                          assessment={item as AssessmentEntity}
                          type={(item as AssessmentEntity).assessmentType}
                        />
                      }
                      creatorPrivileges={['moduleItems.create']}
                      viewerPrivileges={['moduleItems.read']}
                      isEditing={editing}
                    />
                  </IfElse>
                  <IfElse condition={item.type === ModuleItemType.ASSIGNMENT}>
                    <EditableView
                      creatorView={
                        <CreateAssignmentForm
                          onSuccess={() => {}}
                          onCancel={goBack}
                          form={assignmentForm}
                          module={module}
                          assignment={item as AssignmentEntity}
                        />
                      }
                      isEditing={editing}
                      viewerView={<AssignmentView assignment={item as AssignmentEntity} />}
                      creatorPrivileges={['moduleItems.create']}
                      viewerPrivileges={['moduleItems.read']}
                    />
                  </IfElse>
                  <IfElse condition={item.type === ModuleItemType.VIDEO}>
                    <ViewModuleVideo
                      module={module}
                      editing={editing}
                      params={params}
                      item={item as ModuleVideoEntity}
                      onEditSuccess={() => setEditing(false)}
                    />
                  </IfElse>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewModulePageProps extends PageComponent {}

export default ViewModuleItem;
