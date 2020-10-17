import React, { useEffect, useState } from 'react';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import useRoutes from '../../../hooks/useRoutes';
import CreateQuizForm from '../../../components/Forms/QuizForms/CreateQuizForm';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import QuizView from '../../../components/UI/AssessmentView';
import EditableView from '../../../components/EditableView';
import AssignmentView from '../../../components/UI/AssignmentView';
import ViewPages from './ViewPages';
import WebComponent from '@doorward/ui/components/WebComponent';
import IfElse from '@doorward/ui/components/IfElse';
import Tools from '@doorward/common/utils/Tools';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import useAction from '@doorward/ui/hooks/useActions';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = (props) => {
  const [item, setItem] = useState<ModuleItemEntity>();
  const [module, setModule] = useState<ModuleEntity>();
  const [courseId, course] = useViewCourse();
  const match: any = useRouteMatch();
  const routes = useRoutes();
  const [editing, setEditing] = useState(routes.currentRoute === routes.editModuleItem.id);
  const assignmentForm = useForm();

  const fetchItem = useAction(DoorwardApi.moduleItems.getModuleItem);
  useEffect(() => {
    fetchItem(match.params.itemId);
  }, [match.params.itemId]);

  const state = useDoorwardApi((state) => state.moduleItems.getModuleItem);

  useEffect(() => {
    setEditing(routes.currentRoute === routes.editModuleItem.id);
  }, [routes.currentRoute]);

  useEffect(() => {
    const moduleItem = state.data.item;
    if (moduleItem) {
      setItem(moduleItem);
    }
  }, [state]);

  useEffect(() => {
    if (course.data.course) {
      const currentModule = course.data.course.modules.find((module) => module.id === match.params.moduleId);
      if (currentModule) {
        setModule(currentModule);
        routes.setTitle(routes.viewModuleItem.id, currentModule.title);
      }
    }
  }, [course.data.course, match.params.itemId]);

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
      noNavBar
      actionBtnProps={{
        icon: 'edit',
        text: item ? `Edit ${item?.type}` : '',
        theme: 'secondary',
        privileges: ['modules.update'],
        onClick: () => routes.navigate(routes.editModuleItem, params),
        disabled: editing,
      }}
      header={Tools.str(state.fetching ? '' : item?.title)}
    >
      <WebComponent data={item} hasData={() => !state.fetching} loading={state.fetching}>
        {(item): JSX.Element => {
          return (
            <React.Fragment>
              {module && (
                <React.Fragment>
                  <IfElse condition={item.type === 'Page'}>
                    <ViewPages
                      onEditSuccess={() => setEditing(false)}
                      module={module}
                      editing={editing}
                      params={params}
                      item={item as PageEntity}
                    />
                  </IfElse>
                  <IfElse condition={item.type === 'Quiz'}>
                    <EditableView
                      viewerView={
                        <QuizView
                          quiz={item as QuizEntity}
                          onCancel={() => routes.navigate(routes.viewCourse, params)}
                        />
                      }
                      creatorView={
                        <CreateQuizForm
                          onSuccess={() => {}}
                          onCancel={() => routes.navigate(routes.viewModuleItem, params)}
                          module={module}
                          quiz={item as QuizEntity}
                        />
                      }
                      creatorPrivileges={['moduleItems.create']}
                      viewerPrivileges={['moduleItems.read']}
                      isEditing={editing}
                    />
                  </IfElse>
                  <IfElse condition={item.type === 'Assignment'}>
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
